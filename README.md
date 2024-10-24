# resume-frontend
🚀 React-based frontend for a dynamic resume CMS, featuring
- **Live Editing:** Instantly update your resume content with a real-time editing interface that reflects changes immediately
- **Access Control:** Securely manage by Magic Link or OTP who can view your resume, ensuring privacy and control over your information
- **User Management:** Effortlessly handle user accounts, add or revoke access by URL
- **File Hosting and Embedding:** Easily upload and embed files, enhancing your resume with PDFs or other additional content
- **Print-Ready Format:** Export your resume by simply clicking print in the browser resulting in a clean, professional layout that retains all content integrity
- **Tracking and Notifications:** Link Matomo and Gotify to track who views your resume and when, receiving notifications to stay informed about viewer interactions.

This is the frontend to [manzari/resume-backend](https://github.com/manzari/resume-backend).

## Develop
```bash
docker compose -f docker-compose.dev.yml up
```

## Deploy
Eventually modify `resume.prod.env` and run `docker-compose -f docker-compose.prod.yml up -d`.
