# Cloud Provider Firewall Configuration

## Issue
PostgreSQL is correctly configured on the server and listening on `0.0.0.0:5432`, but connections from outside are failing. This is likely a **cloud provider firewall** issue.

## Solution: Configure Security Group / Firewall Rules

### For AWS EC2:

1. **Go to AWS Console** → EC2 → Security Groups
2. **Find the security group** attached to your instance (`40.192.24.24`)
3. **Add Inbound Rule:**
   - Type: `PostgreSQL`
   - Protocol: `TCP`
   - Port: `5432`
   - Source: 
     - For testing: `0.0.0.0/0` (all IPs - not recommended for production)
     - For production: Your specific IP or IP range
   - Description: `PostgreSQL database access`

4. **Save the rule**

### For Azure:

1. **Go to Azure Portal** → Virtual Machines
2. **Select your VM** → Networking
3. **Add Inbound Port Rule:**
   - Name: `postgresql`
   - Priority: `1000`
   - Source: `Any` or `IP Addresses` (your IP)
   - Service: `Custom`
   - Protocol: `TCP`
   - Port ranges: `5432`
   - Action: `Allow`

### For Google Cloud:

1. **Go to GCP Console** → VPC Network → Firewall Rules
2. **Create Firewall Rule:**
   - Name: `allow-postgresql`
   - Direction: `Ingress`
   - Targets: `All instances in the network` or specific tags
   - Source IP ranges: `0.0.0.0/0` (or your IP)
   - Protocols and ports: `tcp:5432`
   - Action: `Allow`

### For DigitalOcean:

1. **Go to DigitalOcean** → Networking → Firewalls
2. **Create or edit firewall**
3. **Add Inbound Rule:**
   - Type: `Custom`
   - Protocol: `TCP`
   - Port Range: `5432`
   - Sources: `All IPv4` (or specific IPs)

### For Hostinger / Other Providers:

Check your hosting provider's firewall/security settings and allow port 5432 for inbound connections.

## Verify After Configuration

After adding the firewall rule, test from your local machine:

```bash
# Test port connectivity
timeout 5 bash -c "echo > /dev/tcp/40.192.24.24/5432" && echo "✅ Port reachable" || echo "❌ Port not reachable"

# Or with telnet
telnet 40.192.24.24 5432
```

If port is reachable, test Prisma connection:

```bash
cd geneveda-biosciences
node -e "require('dotenv').config({ path: '.env.local' }); const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$queryRaw\`SELECT 1\`.then(() => { console.log('✅ Connected!'); process.exit(0); }).catch(e => { console.error('❌', e.message); process.exit(1); });"
```

## Security Best Practices

For production:
- **Don't use `0.0.0.0/0`** - Allow only specific IPs
- Use **VPN** or **SSH tunnel** for database access
- Consider using **SSL/TLS** connections
- Use **strong passwords**
- Regularly **update PostgreSQL**

## Alternative: SSH Tunnel (More Secure)

If you can't open port 5432, use SSH tunnel:

```bash
# Create SSH tunnel
ssh -i ~/.ssh/id_ed25519_developer -L 5432:localhost:5432 user1@40.192.24.24

# Then update .env.local:
DATABASE_URL="postgresql://geneveda_user:GeneVeda2025%21Secure@localhost:5432/geneveda_biosciences?sslmode=prefer"
```

## Next Steps

1. Configure cloud firewall
2. Test connection
3. Run `npx prisma db push`
4. Create admin user
5. Deploy to Vercel

