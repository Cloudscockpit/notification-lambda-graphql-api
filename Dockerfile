# Use the correct AWS Lambda build image
FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /var/task

# Copy package files
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Create zip
RUN zip -r lambda-deployment.zip dist node_modules package.json