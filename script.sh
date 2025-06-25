#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/jpbhatt21/bisct.git"  # Replace with your repository URL
CLONE_DIR="./bisct"  # Directory to clone the repository

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install build tools (make and build-essential)
install_build_tools() {
    print_status "Installing build tools (make and build-essential)..."

    # Check if make is already installed
    local make_installed=false
    local build_essential_needed=false

    if command_exists make; then
        print_warning "make is already installed. Version: $(make --version | head -n1)"
        make_installed=true
    else
        build_essential_needed=true
    fi

    # Check if gcc is available (indicator of build-essential)
    if command_exists gcc; then
        print_warning "build-essential appears to be installed. GCC version: $(gcc --version | head -n1)"
    else
        build_essential_needed=true
    fi

    # Install if needed
    if [ "$build_essential_needed" = true ]; then
        print_status "Installing make and build-essential..."

        # Update package index
        sudo apt update

        # Install both packages
        sudo apt install -y make build-essential

        if [ $? -eq 0 ]; then
            print_success "Build tools installed successfully"
        else
            print_error "Failed to install build tools"
            exit 1
        fi
    else
        print_success "All build tools are already installed"
    fi
}

# Function to install Node.js
install_node() {
    print_status "Installing Node.js..."

    # Check if Node.js is already installed
    if command_exists node; then
        print_warning "Node.js is already installed. Version: $(node --version)"
        return 0
    fi

    # Install Node.js using NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs

    if [ $? -eq 0 ]; then
        print_success "Node.js installed successfully"
    else
        print_error "Failed to install Node.js"
        exit 1
    fi
}

# Function to install Docker
install_docker() {
    print_status "Installing Docker..."

    # Check if Docker is already installed
    if command_exists docker; then
        print_warning "Docker is already installed. Version: $(docker --version)"
        return 0
    fi

    # Update package index
    sudo apt-get update

    # Install required packages
    sudo apt-get install -y ca-certificates curl

    # Add Docker's official GPG key
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
        $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Update package index again
    sudo apt-get update

    # Install Docker packages
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Add current user to docker group
    sudo usermod -aG docker $USER

    if [ $? -eq 0 ]; then
        print_success "Docker installed successfully"
        print_warning "Please log out and log back in for Docker group changes to take effect"
    else
        print_error "Failed to install Docker"
        exit 1
    fi
}

# Function to install Git
install_git() {
    print_status "Installing Git..."

    # Check if Git is already installed
    if command_exists git; then
        print_warning "Git is already installed. Version: $(git --version)"
        return 0
    fi

    # Update package index and install Git
    sudo apt update
    sudo apt install -y git

    if [ $? -eq 0 ]; then
        print_success "Git installed successfully"
    else
        print_error "Failed to install Git"
        exit 1
    fi
}

# Function to install nixpacks
install_nixpacks() {
    print_status "Installing nixpacks..."

    # Check if nixpacks is already installed
    if command_exists nixpacks; then
        print_warning "nixpacks is already installed. Version: $(nixpacks --version)"
        return 0
    fi

    # Install nixpacks using the official installer
    curl -sSL https://nixpacks.com/install.sh | bash

    if [ $? -eq 0 ]; then
        print_success "nixpacks installed successfully"
    else
        print_error "Failed to install nixpacks via installer, trying npm..."
        # Fallback to npm installation if available
        if command_exists npm; then
            sudo npm install -g nixpacks
            if [ $? -eq 0 ]; then
                print_success "nixpacks installed successfully via npm"
            else
                print_error "Failed to install nixpacks"
                exit 1
            fi
        else
            print_error "npm is required to install nixpacks. Please ensure Node.js is installed properly."
            exit 1
        fi
    fi
}

# Function to clone repository
clone_repository() {
    print_status "Cloning repository..."

    # Check if Git is available
    if ! command_exists git; then
        print_error "Git is not installed. Cannot clone repository."
        exit 1
    fi

    # Remove existing directory if it exists
    if [ -d "$CLONE_DIR" ]; then
        print_warning "Directory $CLONE_DIR already exists. Removing..."
        rm -rf "$CLONE_DIR"
    fi

    # Clone the repository
    print_status "Cloning repository from $REPO_URL..."
    git clone "$REPO_URL" "$CLONE_DIR"

    if [ $? -eq 0 ]; then
        print_success "Repository cloned successfully to $CLONE_DIR"
    else
        print_error "Failed to clone repository"
        exit 1
    fi
}

# Function to verify installations
verify_installations() {
    print_status "Verifying installations..."

    # Verify make
    if command_exists make; then
        MAKE_VERSION=$(make --version | head -n1)
        print_success "make: $MAKE_VERSION"
    else
        print_error "make verification failed"
        return 1
    fi

    # Verify gcc (build-essential)
    if command_exists gcc; then
        GCC_VERSION=$(gcc --version | head -n1)
        print_success "gcc: $GCC_VERSION"
    else
        print_error "gcc verification failed"
        return 1
    fi

    # Verify Node.js
    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_success "Node.js: $NODE_VERSION"
    else
        print_error "Node.js verification failed"
        return 1
    fi

    # Verify npm
    if command_exists npm; then
        NPM_VERSION=$(npm --version)
        print_success "npm: v$NPM_VERSION"
    else
        print_error "npm verification failed"
        return 1
    fi

    # Verify Docker
    if command_exists docker; then
        DOCKER_VERSION=$(docker --version)
        print_success "Docker: $DOCKER_VERSION"
    else
        print_error "Docker verification failed"
    fi

    # Verify Git
    if command_exists git; then
        GIT_VERSION=$(git --version)
        print_success "Git: $GIT_VERSION"
    else
        print_error "Git verification failed"
    fi

    # Verify nixpacks
    if command_exists nixpacks; then
        NIXPACKS_VERSION=$(nixpacks --version)
        print_success "nixpacks: $NIXPACKS_VERSION"
    else
        print_error "nixpacks verification failed"
    fi

    # Verify repository clone
    if [ -d "$CLONE_DIR" ]; then
        print_success "Repository cloned at: $CLONE_DIR"
    else
        print_error "Repository clone verification failed"
        return 1
    fi

    return 0
}

# Function to start Docker daemon
start_docker_daemon() {
    print_status "Starting Docker daemon..."

    # Check if Docker is installed
    if ! command_exists docker; then
        print_error "Docker is not installed. Cannot start Docker daemon."
        return 1
    fi

    # Check if Docker daemon is already running
    if sudo systemctl is-active --quiet docker; then
        print_warning "Docker daemon is already running"
        return 0
    fi

    # Start Docker service
    sudo systemctl start docker

    if [ $? -eq 0 ]; then
        print_success "Docker daemon started successfully"

        # Enable Docker to start on boot
        sudo systemctl enable docker
        print_status "Docker enabled to start on boot"

        # Wait a moment for Docker to fully initialize
        sleep 3

        # Test Docker with hello-world (optional)
        print_status "Testing Docker installation..."
        if sudo docker run hello-world >/dev/null 2>&1; then
            print_success "Docker is working correctly"
        else
            print_warning "Docker started but test failed. This might be normal if hello-world image is not available."
        fi

    else
        print_error "Failed to start Docker daemon"
        return 1
    fi
}

# Function to run the application as a systemd service
run_application() {
    print_status "Setting up application as a systemd service..."

    # Check if the bisct-server directory exists
    if [ ! -d "$CLONE_DIR/bisct-server" ]; then
        print_error "bisct-server directory not found in $CLONE_DIR"
        print_status "Available directories in $CLONE_DIR:"
        ls -la "$CLONE_DIR"
        exit 1
    fi

    # Navigate to the bisct-server directory
    print_status "Changing to $CLONE_DIR/bisct-server..."
    cd "$CLONE_DIR/bisct-server"

    # Get the absolute path for the service
    APP_DIR=$(pwd)
    SERVICE_NAME="bisct-server"
    SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"

    # Check and set NODE_ENV if not already declared
    if [ -z "$NODE_ENV" ]; then
        print_status "NODE_ENV not set, will use NODE_ENV=production for service..."
        NODE_ENV=production
        print_success "Will use NODE_ENV=production"
    else
        print_warning "NODE_ENV already set to: $NODE_ENV"
    fi

    # Check and set JWT_SECRET if not already declared
    if [ -z "$JWT_SECRET" ]; then
        print_status "JWT_SECRET not set, generating random JWT secret for service..."

        # Generate a random JWT secret token
        JWT_SECRET=$(openssl rand -hex 32)
        if [ $? -ne 0 ]; then
            # Fallback method using /dev/urandom if openssl fails
            print_warning "OpenSSL not available, using fallback method..."
            JWT_SECRET=$(cat /dev/urandom | tr -dc 'a-f0-9' | fold -w 64 | head -n 1)
        fi

        print_success "Generated JWT_SECRET: ${JWT_SECRET:0:8}... (truncated for security)"
    else
        print_warning "JWT_SECRET already set in system environment"
    fi

    # Display environment variables for verification
    print_status "Service will use environment variables:"
    echo "NODE_ENV: $NODE_ENV"
    echo "JWT_SECRET: ${JWT_SECRET:0:8}... (truncated for security)"

    # Install dependencies and build
    print_status "Installing npm dependencies..."
    npm i
    if [ $? -ne 0 ]; then
        print_error "Failed to install npm dependencies"
        exit 1
    fi
    print_success "Dependencies installed successfully"

    # Build the project
    print_status "Building the project..."
    npm run build
    if [ $? -ne 0 ]; then
        print_error "Failed to build the project"
        exit 1
    fi
    print_success "Project built successfully"

    # Stop existing service if running
    if systemctl is-active --quiet "$SERVICE_NAME"; then
        print_warning "Stopping existing $SERVICE_NAME service..."
        sudo systemctl stop "$SERVICE_NAME"
    fi

    # Create systemd service file
    print_status "Creating systemd service file at $SERVICE_FILE..."
    sudo tee "$SERVICE_FILE" > /dev/null << EOF
[Unit]
Description=BISCT Server Application
Documentation=https://github.com/jpbhatt21/bisct
After=network.target
Wants=network.target

[Service]
Type=simple
User=$USER
Group=$USER
WorkingDirectory=$APP_DIR
Environment=NODE_ENV=$NODE_ENV
Environment=JWT_SECRET=$JWT_SECRET
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=$SERVICE_NAME

# Security settings
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ProtectHome=yes
ReadWritePaths=$APP_DIR

[Install]
WantedBy=multi-user.target
EOF

    if [ $? -eq 0 ]; then
        print_success "Service file created successfully"
    else
        print_error "Failed to create service file"
        exit 1
    fi

    # Reload systemd daemon
    print_status "Reloading systemd daemon..."
    sudo systemctl daemon-reload

    # Enable the service to start on boot
    print_status "Enabling $SERVICE_NAME service..."
    sudo systemctl enable "$SERVICE_NAME"
    if [ $? -eq 0 ]; then
        print_success "Service enabled successfully"
    else
        print_error "Failed to enable service"
        exit 1
    fi

    # Start the service
    print_status "Starting $SERVICE_NAME service..."
    sudo systemctl start "$SERVICE_NAME"
    if [ $? -eq 0 ]; then
        print_success "Service started successfully"
    else
        print_error "Failed to start service"
        # Show service status for debugging
        print_status "Service status:"
        sudo systemctl status "$SERVICE_NAME" --no-pager
        exit 1
    fi

    # Wait a moment for the service to initialize
    sleep 3

    # Check service status
    print_status "Checking service status..."
    if systemctl is-active --quiet "$SERVICE_NAME"; then
        print_success "$SERVICE_NAME service is running"

        # Display service status
        print_status "Service status:"
        sudo systemctl status "$SERVICE_NAME" --no-pager -l

        # Display recent logs
        print_status "Recent service logs:"
        sudo journalctl -u "$SERVICE_NAME" --no-pager -l -n 10

        # Display service management commands
        print_status "Service management commands:"
        echo "  Start:   sudo systemctl start $SERVICE_NAME"
        echo "  Stop:    sudo systemctl stop $SERVICE_NAME"
        echo "  Restart: sudo systemctl restart $SERVICE_NAME"
        echo "  Status:  sudo systemctl status $SERVICE_NAME"
        echo "  Logs:    sudo journalctl -u $SERVICE_NAME -f"
        echo "  Disable: sudo systemctl disable $SERVICE_NAME"

    else
        print_error "$SERVICE_NAME service failed to start"

        # Show detailed status and logs for debugging
        print_status "Detailed service status:"
        sudo systemctl status "$SERVICE_NAME" --no-pager -l

        print_status "Service logs:"
        sudo journalctl -u "$SERVICE_NAME" --no-pager -l -n 20

        exit 1
    fi

    print_success "Application successfully set up and running as a systemd service!"
}


# Main execution
main() {
    print_status "Starting installation script..."

    # Update system packages
    print_status "Updating system packages..."
    sudo apt update

    # Install components (build tools first since they're fundamental)
    install_build_tools
    install_git
    install_node
    install_docker
    install_nixpacks
    clone_repository

    # Verify installations
    if verify_installations; then
        print_success "All installations verified successfully!"

        # Start Docker daemon
        start_docker_daemon
        sudo usermod -aG docker $USER
        newgrp docker

        # Run the application
        run_application
    else
        print_error "Installation verification failed. Cannot start application."
        exit 1
    fi
}

# Run main function
main
