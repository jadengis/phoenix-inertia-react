#!/bin/bash

# Phoenix Inertia React Template - Project Rename Script
# This script renames all occurrences of the template project names to your custom names

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 <PascalCaseName> <snake_case_name> <kebab-case-name>"
    echo ""
    echo "Examples:"
    echo "  $0 BlogApp blog_app blog-app"
    echo "  $0 EcommerceStore ecommerce_store ecommerce-store"
    echo "  $0 TaskManager task_manager task-manager"
    echo ""
    echo "Parameters:"
    echo "  PascalCaseName   - Module name (e.g., BlogApp, EcommerceStore)"
    echo "  snake_case_name  - Elixir app name (e.g., blog_app, ecommerce_store)"
    echo "  kebab-case-name  - Package.json name (e.g., blog-app, ecommerce-store)"
}

# Check if correct number of arguments provided
if [ $# -ne 3 ]; then
    print_error "Invalid number of arguments."
    show_usage
    exit 1
fi

# Assign arguments to variables
PASCAL_NAME="$1"
SNAKE_NAME="$2"
KEBAB_NAME="$3"

# Validate input format
if ! [[ "$PASCAL_NAME" =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
    print_error "PascalCaseName must start with uppercase letter and contain only letters and numbers."
    exit 1
fi

if ! [[ "$SNAKE_NAME" =~ ^[a-z][a-z0-9_]*$ ]]; then
    print_error "snake_case_name must start with lowercase letter and contain only lowercase letters, numbers, and underscores."
    exit 1
fi

if ! [[ "$KEBAB_NAME" =~ ^[a-z][a-z0-9\-]*$ ]]; then
    print_error "kebab-case-name must start with lowercase letter and contain only lowercase letters, numbers, and hyphens."
    exit 1
fi

print_status "Starting project rename..."
print_status "PascalCase: InertiaApp -> $PASCAL_NAME"
print_status "snake_case: inertia_app -> $SNAKE_NAME"
print_status "kebab-case: inertia-app -> $KEBAB_NAME"

# Function to replace in file
replace_in_file() {
    local file="$1"
    local search="$2"
    local replace="$3"
    
    if [ -f "$file" ]; then
        if grep -q "$search" "$file"; then
            sed -i.bak "s/$search/$replace/g" "$file"
            rm "$file.bak"
            print_success "Updated $file"
        fi
    fi
}

# Function to replace in all files matching pattern
replace_in_files() {
    local pattern="$1"
    local search="$2"
    local replace="$3"
    
    find . -name "$pattern" -type f -not -path "./_build/*" -not -path "./deps/*" -not -path "./assets/node_modules/*" | while read -r file; do
        replace_in_file "$file" "$search" "$replace"
    done
}

# Rename files and directories
print_status "Renaming files and directories..."

# Rename app directories
if [ -d "apps/inertia_app" ]; then
    mv "apps/inertia_app" "apps/$SNAKE_NAME"
    print_success "Renamed apps/inertia_app to apps/$SNAKE_NAME"
fi

if [ -d "apps/inertia_app_web" ]; then
    mv "apps/inertia_app_web" "apps/${SNAKE_NAME}_web"
    print_success "Renamed apps/inertia_app_web to apps/${SNAKE_NAME}_web"
fi

# Rename database files
if [ -f "inertia_app_dev.db" ]; then
    mv "inertia_app_dev.db" "${SNAKE_NAME}_dev.db"
    print_success "Renamed database file to ${SNAKE_NAME}_dev.db"
fi

if [ -f "inertia_app_dev.db-shm" ]; then
    mv "inertia_app_dev.db-shm" "${SNAKE_NAME}_dev.db-shm"
fi

if [ -f "inertia_app_dev.db-wal" ]; then
    mv "inertia_app_dev.db-wal" "${SNAKE_NAME}_dev.db-wal"
fi

# Update content in files
print_status "Updating file contents..."

# Replace PascalCase module names
replace_in_files "*.ex" "InertiaApp" "$PASCAL_NAME"
replace_in_files "*.exs" "InertiaApp" "$PASCAL_NAME"

# Replace snake_case names
replace_in_files "*.ex" "inertia_app" "$SNAKE_NAME"
replace_in_files "*.exs" "inertia_app" "$SNAKE_NAME"
replace_in_files "mix.exs" "inertia_app" "$SNAKE_NAME"

# Replace kebab-case name in package.json
replace_in_file "assets/package.json" "inertia-app" "$KEBAB_NAME"

# Update specific configuration files
print_status "Updating configuration files..."

# Update database URLs and names in config files
find config -name "*.exs" -type f | while read -r file; do
    replace_in_file "$file" "inertia_app" "$SNAKE_NAME"
    replace_in_file "$file" "InertiaApp" "$PASCAL_NAME"
done

# Update release configuration
replace_in_file "mix.exs" "inertia_app_web:" "${SNAKE_NAME}_web:"

# Update paths in configuration that reference the app name
find config -name "*.exs" -type f | while read -r file; do
    replace_in_file "$file" "apps/inertia_app_web/" "apps/${SNAKE_NAME}_web/"
done

# Update any remaining references in lib files
find apps -name "*.ex" -type f | while read -r file; do
    replace_in_file "$file" "InertiaApp" "$PASCAL_NAME"
    replace_in_file "$file" "inertia_app" "$SNAKE_NAME"
done

# Update test files
find . -name "*test.exs" -type f -not -path "./_build/*" -not -path "./deps/*" | while read -r file; do
    replace_in_file "$file" "InertiaApp" "$PASCAL_NAME"
    replace_in_file "$file" "inertia_app" "$SNAKE_NAME"
done

# Update support files
find . -name "*.ex" -path "*/test/support/*" -type f | while read -r file; do
    replace_in_file "$file" "InertiaApp" "$PASCAL_NAME"
    replace_in_file "$file" "inertia_app" "$SNAKE_NAME"
done

# Update Docker and deployment files
if [ -f "Dockerfile" ]; then
    replace_in_file "Dockerfile" "inertia_app" "$SNAKE_NAME"
    replace_in_file "Dockerfile" "inertia-app" "$KEBAB_NAME"
fi

# Update any shell scripts or environment files
find . -name "*.sh" -o -name "*.eex" -type f -not -path "./_build/*" -not -path "./deps/*" | while read -r file; do
    replace_in_file "$file" "inertia_app" "$SNAKE_NAME"
    replace_in_file "$file" "InertiaApp" "$PASCAL_NAME"
done

print_status "Cleaning up generated files..."

# Remove build artifacts that might contain old names
rm -rf _build/
rm -rf deps/
rm -rf assets/node_modules/

print_success "Project successfully renamed!"
print_warning "Next steps:"
echo "1. Run 'mix deps.get' to fetch dependencies"
echo "2. Run 'cd assets && npm install' to install frontend dependencies"
echo "3. Run 'mix ecto.create' to create your database"
echo "4. Run 'mix ecto.migrate' to run migrations"
echo "5. Run 'mix phx.server' to start your application"
echo ""
print_warning "Don't forget to:"
echo "- Update your git remote if this is a new repository"
echo "- Update any documentation with your new project name"
echo "- Review and update the README.md if needed"