# MERGIT is a OpenSource Git Hosting Service

## This project is a Git hosting service, similar to GitHub, providing a robust ecosystem and tools for managing repositories, SSH keys, and user authentication.

### Tech Stack 
 - golang
 - Typescript
 - ejs | Mustash ( can be changed accordingly )
 - shell
 - libsql | turso | sqlite
 - SSO | OAuth
 - etc..

```mermaid

graph TD
    A[User] -->|Login| B[CLI Tool]
    B -->|Send Credentials| C[Server]
    C -->|Validate and Generate Token| D[Database]
    D -->|Store Token| C
    C -->|Generate SSH Key Pair| E[Git Server]
    E -->|Store Public Key| F[Git Repos]
    C -->|Send Private Key| B
    B -->|Store Private Key| A

    subgraph Public Read Access
        G[Anyone] -->|git clone/pull| F[Git Repos]
    end

    subgraph Owner Write Access
        A -->|Run git push| H[Git Client]
        H -->|Use SSH Key| E
        E -->|Verify SSH Key| F
        F -->|Process Push| E
        E -->|Return Result| H
        H -->|Display Result| A
    end
```

### Under Construction

This Git hosting service is currently under development. We are working to build a comprehensive ecosystem similar to GitHub, with unique tools and features. Contributions from the community are highly appreciated.

### Contact

If you would like to contribute or have any questions, please contact us at:

Email: akshatkot@gmail.com

