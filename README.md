
# Fantasy Football Trade Analyzer

This project is a full-stack web application designed to assist fantasy football players in identifying ideal trade targets using powerful filters, analytics, and insights. The app provides a user-friendly interface and is built with Docker for easy setup and deployment.

## Project Structure

- **Backend**: REST API built with Python, providing the necessary endpoints for the frontend to retrieve player statistics, trade recommendations, and analytics.
- **Frontend**: A Next.js application for an interactive and dynamic web interface.

## Features

- **Advanced Filtering**: Narrow down trade targets using filters based on player stats, positions, and trade values.
- **Analytics & Insights**: Data-driven insights to make informed trade decisions.
- **Real-Time Updates**: Hot-reloading enabled for development, ensuring that code changes reflect instantly without needing to restart containers.

## Prerequisites

- Docker and Docker Compose installed on your machine.
- Basic understanding of Docker Compose for managing multi-container applications.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fantasy-football-trade-analyzer.git
cd fantasy-football-trade-analyzer
```

### 2. Build and Start the Application

Use the provided `Makefile` commands to manage the Docker Compose services easily.

To build and start the application:

```bash
make build
make up
```

### 3. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:8000](http://localhost:8000)

### Available Commands

| Command     | Description                                                     |
|-------------|-----------------------------------------------------------------|
| `make build`   | Build all services                                            |
| `make up`      | Start all services in detached mode                           |
| `make down`    | Stop and remove all containers and networks                   |
| `make logs`    | View logs for all services                                    |
| `make restart` | Restart all services                                          |
| `make clean`   | Clean up unused Docker resources                              |
| `make reset`   | Fully reset containers, volumes, networks, and rebuild        |
| `make help`    | Display help for all available commands                       |

### Development

- **Hot Reloading**: Code changes in the `backend` and `frontend` directories will automatically reflect in the containers.
- **Docker Volumes**: Volumes are configured to avoid overwriting essential folders like `node_modules` and `__pycache__`.

## Troubleshooting

- **Port Conflicts**: Ensure that ports `3000` and `8000` are free before starting the containers.
- **Network Issues**: Restart containers with `make restart` if services are unable to communicate.

## Contributing

Feel free to open issues or submit pull requests for improvements, bug fixes, or additional features.

---
