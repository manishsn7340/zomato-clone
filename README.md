# zomato-clone


# ⭐ **How to Run the Project – Full Setup (Frontend + Admin + Backend)**

This project contains three parts:

* **Frontend (User website)**
* **Admin Panel**
* **Backend Server (API + Database)**

Follow the steps below to run the complete system.

---

## ✅ **1. Requirements**

Before running the project, install:

* Node.js

---

## ✅ **2. Extract the Project**

Unzip the project folder:
Inside it you will see:

```
/backend
/frontend
/admin
```

---

# 🚀 **Backend Setup**

## **3. Install Backend Dependencies**

Open terminal and run:

```bash
cd backend
npm install
```

## **4. Setup Environment Variables**

Inside the **backend** folder, create a `.env` file:

```
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
```

## **5. Start Backend Server**

```bash
npm start
```

The backend will run on:

```
http://localhost:4000
```

---

# 🎨 **Frontend (User App) Setup**

## **6. Install Frontend Dependencies**

Open new terminal:

```bash
cd frontend
npm install
```

## **7. Start Frontend**

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# 🛠️ **Admin Panel Setup**

## **8. Install Admin Panel Dependencies**

```bash
cd admin
npm install
```

## **9. Start Admin Panel**

```bash
npm run dev
```

Admin panel will open at:

```
http://localhost:5174
```

---

# ✔️ **10. Project Usage**

* **Frontend:** Users can explore menu, add items to cart, place orders, and make payments using Stripe.
* **Admin Panel:** Admin can add food items, view food list, manage orders, and update order status.
* **Backend:** Handles authentication, food management, cart operations, order processing, and Stripe payments.

---

# 🏁 **Project Successfully Running**

Once all three terminals are running:

* **Backend:** [http://localhost:4000](http://localhost:4000)
* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Admin:** [http://localhost:5174](http://localhost:5174)

Your full Zomato Clone system is ready to use.

---
