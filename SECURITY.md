# Security Policy

## Reporting Security Vulnerabilities
If you discover a security vulnerability or malicious skill instruction in SkillWeave, please report it via the in-app Security Incident Portal or email `security@skillweave.dev`.

## Security Philosophy
- **Least Privilege**: SkillWeave strictly audits filesystem read/write, shell execution, and network permissions.
- **Untrusted Ingestion**: Repository metadata and prompt manifests are treated as untrusted data.
- **No Secret Key Storage**: SkillWeave operates client-side without storing user API credentials.
