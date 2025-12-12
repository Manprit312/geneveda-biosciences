# 🔧 SSH Connection Troubleshooting

## Issue: SSH Asking for Password

If SSH is asking for password instead of using the key, try these solutions:

---

## Solution 1: Check Key Permissions

```bash
# Set correct permissions
chmod 600 ~/.ssh/id_ed25519_developer
chmod 644 ~/.ssh/id_ed25519_developer.pub

# Verify
ls -la ~/.ssh/id_ed25519_developer
```

---

## Solution 2: Use Explicit Key Path

```bash
# Try with full path
ssh -i ~/.ssh/id_ed25519_developer user1@40.192.24.24

# Or with absolute path
ssh -i /Users/rupindersingh/.ssh/id_ed25519_developer user1@40.192.24.24
```

---

## Solution 3: Add Key to SSH Agent

```bash
# Start SSH agent
eval "$(ssh-agent -s)"

# Add key
ssh-add ~/.ssh/id_ed25519_developer

# Verify key is added
ssh-add -l

# Try connection
ssh user1@40.192.24.24
```

---

## Solution 4: Use SSH Config File

Create/edit `~/.ssh/config`:

```
Host geneveda-server
    HostName 40.192.24.24
    User user1
    IdentityFile ~/.ssh/id_ed25519_developer
    PreferredAuthentications publickey
    PasswordAuthentication no
```

Then connect:
```bash
ssh geneveda-server
```

---

## Solution 5: Verify Public Key on Server

The public key needs to be in `~/.ssh/authorized_keys` on the server.

If you have password access, you can add it:

```bash
# On server (after password login)
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICrZwveuwrfmxXd+TGgD5KRMh4ZUQrcFoJHfC84/1Gg9 developer" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## Solution 6: Use Password Once, Then Setup Key

If you can login with password:

```bash
# Login with password
ssh user1@40.192.24.24

# On server, add public key
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
# Paste: ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICrZwveuwrfmxXd+TGgD5KRMh4ZUQrcFoJHfC84/1Gg9 developer
chmod 600 ~/.ssh/authorized_keys
exit

# Now try key-based login
ssh -i ~/.ssh/id_ed25519_developer user1@40.192.24.24
```

---

## Solution 7: Check Server SSH Config

On the server, check:

```bash
# Check SSH config
sudo nano /etc/ssh/sshd_config

# Ensure these are set:
# PubkeyAuthentication yes
# AuthorizedKeysFile .ssh/authorized_keys

# Restart SSH
sudo systemctl restart sshd
```

---

## Quick Test Commands

```bash
# Test with verbose output
ssh -v -i ~/.ssh/id_ed25519_developer user1@40.192.24.24

# Test with all debug info
ssh -vvv -i ~/.ssh/id_ed25519_developer user1@40.192.24.24
```

---

## Alternative: Use Password for Now

If key authentication isn't working, you can:

1. **Login with password:**
   ```bash
   ssh user1@40.192.24.24
   # Enter password when prompted
   ```

2. **Then setup PostgreSQL manually on server**

3. **Later fix SSH key authentication**

---

## 📋 Checklist

- [ ] Key permissions correct (600)
- [ ] Public key in server's authorized_keys
- [ ] SSH config file created (optional)
- [ ] SSH agent has key loaded (optional)
- [ ] Server allows public key authentication

---

## 🆘 Still Having Issues?

1. **Check if you have the correct private key**
2. **Verify public key matches the one on server**
3. **Contact server admin to verify key is added**
4. **Use password login temporarily to setup database**



