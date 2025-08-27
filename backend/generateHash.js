const bcrypt = require('bcryptjs');

async function generateHashes() {
  const adminPassword = 'admin123';
  const userPassword = 'user123';
  
  const salt = await bcrypt.genSalt(10);
  const adminHash = await bcrypt.hash(adminPassword, salt);
  const userHash = await bcrypt.hash(userPassword, salt);
  
  console.log('Admin password hash:', adminHash);
  console.log('User password hash:', userHash);
}

generateHashes();