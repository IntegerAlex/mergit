const express = require('express');
const app = express();
const { exec } = require('child_process');

// Function to add SSH key to authorized_keys
function addSshKey(username, sshKey) {
    return new Promise((resolve, reject) => {
        exec(`sudo bash -c "echo 'command=\"git-shell -c \\\\\"$SSH_ORIGINAL_COMMAND\\\\\"\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty ${sshKey}" >> /home/git/.ssh/authorized_keys"`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

// Function to initialize Git repository for a user
function createRepository(username, repoName) {
    return new Promise((resolve, reject) => {
        exec(`sudo mkdir -p /home/git/repos/${username}/${repoName}.git && sudo git init --bare /home/git/repos/${username}/${repoName}.git && sudo chown -R git:git /home/git/repos/${username}/${repoName}.git`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

// Example endpoint to add SSH key
app.post('/add-ssh-key', async (req, res) => {
    const { username, sshKey } = req.body;
    try {
        await addSshKey(username, sshKey);
        res.status(200).send(`SSH key added for ${username}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add SSH key');
    }
});

// Example endpoint to create a repository
app.post('/create-repo', async (req, res) => {
    const { username, repoName } = req.body;
    try {
        await createRepository(username, repoName);
        res.status(200).send(`Repository ${repoName} created for ${username}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create repository');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

