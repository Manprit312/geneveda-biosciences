require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function safeMigrateBlogs() {
  try {
    console.log('🔄 Starting safe migration of blogs table...');

    // Step 1: Check if category column exists
    const tableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'blogs' AND column_name = 'category'
    `;

    if (tableInfo && tableInfo.length === 0) {
      console.log('📝 Adding category column with default value...');
      // Try to add category column - first as text, then we'll convert to enum
      await prisma.$executeRawUnsafe(`
        ALTER TABLE blogs 
        ADD COLUMN IF NOT EXISTS category text DEFAULT 'Research'
      `);
      
      // Try to convert to enum if the enum type exists
      try {
        // Check what enum types exist
        const enumTypes = await prisma.$queryRaw`
          SELECT t.typname 
          FROM pg_type t 
          JOIN pg_enum e ON t.oid = e.enumtypid 
          WHERE e.enumlabel = 'Research'
        `;
        
        if (enumTypes && enumTypes.length > 0) {
          const enumTypeName = enumTypes[0].typname;
          console.log(`🔄 Converting category to enum type: ${enumTypeName}`);
          await prisma.$executeRawUnsafe(`
            ALTER TABLE blogs 
            ALTER COLUMN category TYPE ${enumTypeName} USING category::${enumTypeName}
          `);
        }
      } catch (e) {
        console.log('ℹ️  Category column added as text (enum will be created by prisma:push)');
      }
      console.log('✅ Category column added');
    } else {
      console.log('ℹ️  Category column already exists');
    }

    // Step 2: Handle tags column - convert to JSON if needed
    const tagsInfo = await prisma.$queryRaw`
      SELECT column_name, data_type, udt_name
      FROM information_schema.columns 
      WHERE table_name = 'blogs' AND column_name = 'tags'
    `;

    if (tagsInfo && tagsInfo.length > 0) {
      const currentType = tagsInfo[0].udt_name;
      console.log(`📊 Current tags column type: ${currentType}`);

      if (currentType !== 'jsonb' && currentType !== 'json') {
        console.log('🔄 Converting tags column to JSONB...');
        
        // Create a temporary column
        await prisma.$executeRawUnsafe(`
          ALTER TABLE blogs 
          ADD COLUMN IF NOT EXISTS tags_new JSONB
        `);

        // Copy data (if it's text, try to parse it)
        await prisma.$executeRawUnsafe(`
          UPDATE blogs 
          SET tags_new = CASE 
            WHEN tags::text = '' OR tags::text IS NULL THEN NULL
            WHEN tags::text LIKE '[%' OR tags::text LIKE '{%' THEN tags::text::jsonb
            ELSE jsonb_build_array(tags::text)
          END
        `);

        // Drop old column and rename new one
        await prisma.$executeRawUnsafe(`
          ALTER TABLE blogs 
          DROP COLUMN IF EXISTS tags,
          RENAME COLUMN tags_new TO tags
        `);

        console.log('✅ Tags column converted to JSONB');
      } else {
        console.log('ℹ️  Tags column is already JSON/JSONB');
      }
    } else {
      console.log('📝 Adding tags column as JSONB...');
      await prisma.$executeRawUnsafe(`
        ALTER TABLE blogs 
        ADD COLUMN IF NOT EXISTS tags JSONB
      `);
      console.log('✅ Tags column added');
    }

    console.log('✅ Migration completed successfully!');
    console.log('📋 You can now run: npm run prisma:push');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    // Try to determine the enum type for category
    if (error.message.includes('admins_role')) {
      console.log('\n💡 Trying alternative enum type...');
      try {
        await prisma.$executeRawUnsafe(`
          ALTER TABLE blogs 
          ADD COLUMN IF NOT EXISTS category text DEFAULT 'Research'
        `);
        console.log('✅ Category column added as text (you may need to convert to enum later)');
      } catch (e) {
        console.error('❌ Alternative approach also failed:', e.message);
      }
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

safeMigrateBlogs();

