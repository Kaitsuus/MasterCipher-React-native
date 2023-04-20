function caesarCipher(str, shift) {
    // Convert the string to uppercase to make it easier to shift letters
    str = str.toUpperCase();
    
    // Create an empty string to store the encrypted message
    let encrypted = "";
    
    // Loop through each character in the string
    for (let i = 0; i < str.length; i++) {
      // Get the character code for the current character
      let charCode = str.charCodeAt(i);
      
      // Check if the character is a letter (A-Z)
      if (charCode >= 65 && charCode <= 90) {
        // Shift the character code by the shift value
        charCode = ((charCode - 65 + shift) % 26) + 65;
      }
      
      // Add the encrypted character to the output string
      encrypted += String.fromCharCode(charCode);
    }
    
    return encrypted;
  }
  
  export default caesarCipher;