#!/bin/bash

# EC2 Deployment Script for YouTube Transcript Application
# This script automates the deployment process on an EC2 instance

set -e  # Exit on error

echo "============================================================"
echo "YouTube Transcript App - EC2 Deployment"
echo "============================================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/YOUR_USERNAME/youtube-transcript.git"
APP_DIR="$HOME/youtube-transcript"
DOMAIN="${1:-your-domain.com}"  # Pass domain as first argument

echo -e "${YELLOW}Updating system...${NC}"
sudo apt update && sudo apt upgrade -y

echo -e "${YELLOW}Installing dependencies...${NC}"
sudo apt install -y python3-pip python3-venv ffmpeg git nginx certbot python3-certbot-nginx

# Install Node.js 18
echo -e "${YELLOW}Installing Node.js 18...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
echo -e "${YELLOW}Installing PM2...${NC}"
sudo npm install -g pm2

# Clone or update repository
if [ -d "$APP_DIR" ]; then
    echo -e "${YELLOW}Updating repository...${NC}"
    cd "$APP_DIR"
    git pull
else
    echo -e "${YELLOW}Cloning repository...${NC}"
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# Setup Python service
echo -e "${YELLOW}Setting up Python service...${NC}"
cd "$APP_DIR/python-service"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
deactivate

# Setup Frontend
echo -e "${YELLOW}Setting up Frontend...${NC}"
cd "$APP_DIR/frontend"
npm install
npm run build

# Setup PM2 processes
echo -e "${YELLOW}Setting up PM2 processes...${NC}"

# Stop existing processes if any
pm2 delete youtube-api 2>/dev/null || true
pm2 delete youtube-frontend 2>/dev/null || true

# Start Python service
cd "$APP_DIR/python-service"
pm2 start "venv/bin/gunicorn -w 4 -b 0.0.0.0:5000 app:app" --name youtube-api

# Start Frontend
cd "$APP_DIR/frontend"
pm2 start "npm start" --name youtube-frontend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup | tail -n 1 | bash

# Configure Nginx
echo -e "${YELLOW}Configuring Nginx...${NC}"
sudo tee /etc/nginx/sites-available/youtube-transcript > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_read_timeout 300s;
        client_max_body_size 50M;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/youtube-transcript /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# Setup SSL (optional but recommended)
if [ "$DOMAIN" != "your-domain.com" ]; then
    echo -e "${YELLOW}Setting up SSL certificate...${NC}"
    sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN"
fi

echo -e "${GREEN}============================================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}============================================================${NC}"
echo ""
echo "Your application is now running!"
echo "Frontend: http://$DOMAIN"
echo "Backend:  http://$DOMAIN/api"
echo ""
echo "Useful commands:"
echo "  pm2 status           - Check process status"
echo "  pm2 logs             - View logs"
echo "  pm2 restart all      - Restart all services"
echo "  pm2 stop all         - Stop all services"
echo ""
echo "To update your app:"
echo "  cd $APP_DIR && git pull"
echo "  pm2 restart all"
