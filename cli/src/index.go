package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
)

// StoreSSHKey stores the provided private key in the ~/.ssh directory (or %USERPROFILE%\.ssh on Windows)
func StoreSSHKey(privateKey string, fileName string) error {
	// Get the user's home directory
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return fmt.Errorf("failed to get home directory: %v", err)
	}

	// Define the .ssh directory path
	sshDir := filepath.Join(homeDir, ".ssh")

	// Ensure the .ssh directory exists, create it if not
	if _, err := os.Stat(sshDir); os.IsNotExist(err) {
		err = os.Mkdir(sshDir, 0700)
		if err != nil {
			return fmt.Errorf("failed to create .ssh directory: %v", err)
		}
	}

	// Define the full path for the private key file
	privateKeyPath := filepath.Join(sshDir, fileName)

	// Check if the file already exists
	if _, err := os.Stat(privateKeyPath); err == nil {
		return fmt.Errorf("file %s already exists", privateKeyPath)
	}

	// Write the private key to the file with appropriate permissions
	err = os.WriteFile(privateKeyPath, []byte(privateKey), 0600)
	if err != nil {
		return fmt.Errorf("failed to write private key to %s: %v", privateKeyPath, err)
	}

	return nil
}

func main() {
	// Example private key (this is just a placeholder, do not use in production)
	privateKey := `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA4r7cLP/Fk1GQK2r5exs3SDkBbKmKz7avsnDLFcBf3IoSeCWz
// ...
-----END RSA PRIVATE KEY-----`

	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Print("Enter the filename to store the private key (e.g., id_rsa): ")
		fileName, _ := reader.ReadString('\n')
		fileName = filepath.Clean(fileName[:len(fileName)-1]) // Trim newline and clean the path

		// Call the function to store the private key
		err := StoreSSHKey(privateKey, fileName)
		if err != nil {
			fmt.Println("Error:", err)
		} else {
			fmt.Println("Private key stored successfully.")
			break
		}
	}
}

