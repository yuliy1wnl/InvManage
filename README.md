📦 InvManage: Inventory Management System

An enterprise-level inventory management system built with Angular
(frontend) and Spring Boot (backend).
It provides separate dashboards for users and admins, with secure login,
role-based access, and real-time data visualization.

------------------------------------------------------------------------

🚀 Features

-   🔑 Authentication & Authorization (Spring Security + JWT)
-   👨‍💼 Admin Dashboard – Manage users, inventory, and view analytics
-   👤 User Dashboard – View inventory, track stock levels, receive
    notifications
-   📊 Charts & Reports – Real-time inventory insights
-   📦 Inventory Management – Add, update, delete, and track items
-   🔔 Notifications – Alerts for low stock and updates
-   ⚡ CI/CD – Automated deployment pipeline
-   🐳 Docker & Kubernetes – Containerized and ready for scalable
    deployment

------------------------------------------------------------------------

🏗️ Tech Stack

Frontend:
- Angular
- HTML, CSS, TypeScript
- ng2-charts (Chart.js)

Backend:
- Spring Boot
- Spring Security & JWT
- JPA/Hibernate
- MySQL

DevOps & Deployment:
- Docker
- Kubernetes
- CI/CD

------------------------------------------------------------------------

📂 Project Structure

    InvManage/
    │── frontend/       # Angular frontend
    │── backend/        # Spring Boot backend
    │── docs/           # Documentation & diagrams
    │── docker/         # Docker & deployment files
    │── README.md       # Project readme

------------------------------------------------------------------------

⚙️ Setup & Installation

1️⃣ Clone the Repository

    git clone https://github.com/your-username/invmanage.git
    cd invmanage

2️⃣ Backend Setup (Spring Boot)

    cd backend
    ./mvnw spring-boot:run

Make sure MySQL is running and update application.properties with your
DB credentials.

3️⃣ Frontend Setup (Angular)

    cd frontend
    npm install
    ng serve

App will be available at: http://localhost:4200/

------------------------------------------------------------------------

🐳 Running with Docker

    docker-compose up --build

------------------------------------------------------------------------

📈 System Architecture

(Insert your system architecture diagram here, e.g., Angular → Spring
Boot → MySQL, deployed via Docker/K8s)

------------------------------------------------------------------------

🔒 Authentication Flow

-   User logs in → Backend issues JWT → Guards protect user/admin routes

------------------------------------------------------------------------

📌 Roadmap

-   ☐ Add role-based analytics for admins
-   ☐ Add PDF/Excel report export
-   ☐ Add email notifications
-   ☐ Enhance Kubernetes deployment with monitoring

------------------------------------------------------------------------

🤝 Contributing

1.  Fork the repo
2.  Create your feature branch (git checkout -b feature-name)
3.  Commit changes (git commit -m 'Add new feature')
4.  Push to branch (git push origin feature-name)
5.  Open a Pull Request

------------------------------------------------------------------------

📜 License

This project is licensed under the MIT License – feel free to use and
modify it.

------------------------------------------------------------------------

⚡ InvManage – Smart, scalable, and secure inventory management!
