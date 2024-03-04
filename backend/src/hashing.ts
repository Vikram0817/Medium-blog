export default async function hashPassword(password: string) {
    // Convert the password string to a Uint8Array
    const passwordBuffer = new TextEncoder().encode(password);
    
    // Generate a hash using the SHA-256 algorithm
    const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
  
    // Convert the hash buffer to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }
  