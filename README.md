# Vercel 2.0

Vercel 2.0 is a basic implementation of a deployment service designed to streamline the process of deploying React projects. It automates the process of fetching source code from a GitHub repository, building it, and deploying the resulting files to an AWS S3 bucket.
this project is madeby following code along session with Harkirat singh on youtube
for steps and video use below links
-[YouTube video](#https://youtu.be/c8_tafixiAs?si=zGuIrt2AXSJykCzB)
-[Resource to Follow steps](#https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa0hvNzNxdDdsRkxqZ1VPS2QybDNtSUx6ZmtsUXxBQ3Jtc0ttREpJU1d4aFQxZTRGSC1hU0tYMEJIR25Jc2JCSFN2QXdtRmRNcktsUFllQy1URWJDcHh2YTJUaERSTUJkYTlRZlM0OFQyODB4ak1ZcnBvWkl5bFM5SFVFMGtOMzJRZmw1NW1lV0dnMG1IaWFnZlRXRQ&q=https%3A%2F%2Fprojects.100xdevs.com%2Ftracks%2FZSQI8YNE0iL6sT1hJpts%2Fvercel-1&v=c8_tafixiAs)
## Table of Contents

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Components](#components)
  - [1. Upload Server](#1-upload-server)
  - [2. Deploy Server](#2-deploy-server)
  - [3. Request Handler](#3-request-handler)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Vercel 2.0 project simplifies the deployment process for React projects by automating the steps involved in fetching the source code, building it, and deploying the resulting files to a cloud storage service. It consists of three main components: the Upload Server, the Deploy Server, and the Request Handler.

## Folder Structure

The project is organized into three main folders:

1. **Upload Server:** This folder contains the code responsible for cloning the GitHub repository locally, uploading the source code to an AWS S3 bucket, and pushing a unique identifier for the deployment job to a Redis queue.

2. **Deploy Server:** Here, you'll find the code that fetches the source code from the Redis queue, retrieves the files from the AWS S3 bucket, builds the project using npm commands, and uploads the built files back to the AWS S3 bucket.

3. **Request Handler:** This folder houses the code that handles requests from browsers to access the built projects. It serves the appropriate files from the AWS S3 bucket to the requesting clients.

## Components

### 1. Upload Server

The Upload Server component performs the following tasks:

- Clones the specified GitHub repository locally.
- Uploads the source code to an AWS S3 bucket.
- Pushes a unique identifier for the deployment job to a Redis queue.

### 2. Deploy Server

The Deploy Server component carries out the following operations:

- Fetches the deployment job identifier from the Redis queue.
- Retrieves the source code from the AWS S3 bucket.
- Builds the project using npm commands to generate HTML/CSS/JS files.
- Uploads the built files back to the AWS S3 bucket.

### 3. Request Handler

The Request Handler component handles requests made by browsers to access the deployed projects. It serves the appropriate files from the AWS S3 bucket to the requesting clients.

## Usage

To use Vercel 2.0, follow these steps:

1. Clone the repository locally.
2. Configure AWS S3 credentials and Redis connection settings as required.
3. Run the Upload Server to initiate the deployment process.
4. Run the Deploy Server to build and deploy the project.
5. Access the deployed project via the Request Handler.

## Contributing

Contributions to Vercel 2.0 are welcome! If you find any issues or have ideas for improvements, please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).
