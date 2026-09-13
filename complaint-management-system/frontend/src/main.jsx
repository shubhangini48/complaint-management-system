import React, { useEffect, useState } from "react";
import {
  createRoot
} from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams
} from "react-router-dom";

import "./styles.css";
import api from "./services/api";


/* =========================
   AUTH HELPERS
========================= */

const user = () =>
  JSON.parse(localStorage.getItem("cms_user") || "null");

const logout = () => {
  localStorage.clear();
  location.href = "/login";
};


/* =========================
   MAIN LAYOUT
========================= */

function Layout({ children }) {
  const u = user();

  return (
    <>
      <nav className="navbar">

        <Link to="/dashboard" className="brand">
          <span className="brand-icon">C</span>

          <span>
            <strong>ComplaintHub</strong>
            <small>Complaint Management System</small>
          </span>
        </Link>

        <div className="nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          {u?.role === "USER" && (
            <Link to="/new">
              New Complaint
            </Link>
          )}

          <span className="user-role">
            {u?.role}
          </span>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </nav>

      <main className="container">
        {children}
      </main>

      <footer className="footer">
        <p>
          © 2026 ComplaintHub · Complaint Management System
        </p>
      </footer>
    </>
  );
}


/* =========================
   AUTH GUARD
========================= */

function Guard({ children }) {
  return localStorage.getItem("cms_token") ? (
    <Layout>
      {children}
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
}


/* =========================
   LOGIN
========================= */

function Login() {
  const nav = useNavigate();

  const [f, setF] = useState({
    email: "",
    password: ""
  });

  const [e, setE] = useState("");

  async function go(event) {
    event.preventDefault();

    try {
      const r = await api.post("/auth/login", f);

      localStorage.setItem("cms_token", r.data.token);
      localStorage.setItem(
        "cms_user",
        JSON.stringify(r.data.user)
      );

      nav("/dashboard");

    } catch (error) {
      setE(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  }

  return (
    <div className="auth-page">

      <form className="auth-card" onSubmit={go}>

        <div className="auth-brand">
          <div className="brand-logo">C</div>

          <h1>ComplaintHub</h1>

          <p>
            Manage and track your complaints easily
          </p>
        </div>

        {e && (
          <p className="error">
            {e}
          </p>
        )}

        <label>
          Email

          <input
            placeholder="Enter your email"
            type="email"
            required
            value={f.email}
            onChange={(x) =>
              setF({
                ...f,
                email: x.target.value
              })
            }
          />
        </label>

        <label>
          Password

          <input
            placeholder="Enter your password"
            type="password"
            required
            value={f.password}
            onChange={(x) =>
              setF({
                ...f,
                password: x.target.value
              })
            }
          />
        </label>

        <button className="primary auth-button">
          Sign In
        </button>

        <p className="auth-footer">
          New to ComplaintHub?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </form>

    </div>
  );
}


/* =========================
   REGISTER
========================= */

function Register() {
  const nav = useNavigate();

  const [f, setF] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [e, setE] = useState("");

  async function go(event) {
    event.preventDefault();

    try {
      const r = await api.post("/auth/register", f);

      localStorage.setItem("cms_token", r.data.token);

      localStorage.setItem(
        "cms_user",
        JSON.stringify(r.data.user)
      );

      nav("/dashboard");

    } catch (error) {
      setE(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  }

  return (
    <div className="auth-page">

      <form className="auth-card" onSubmit={go}>

        <div className="auth-brand">
          <div className="brand-logo">C</div>

          <h1>Create Account</h1>

          <p>
            Join ComplaintHub today
          </p>
        </div>

        {e && (
          <p className="error">
            {e}
          </p>
        )}

        <label>
          Full Name

          <input
            placeholder="Enter your name"
            required
            value={f.name}
            onChange={(x) =>
              setF({
                ...f,
                name: x.target.value
              })
            }
          />
        </label>

        <label>
          Email

          <input
            placeholder="Enter your email"
            type="email"
            required
            value={f.email}
            onChange={(x) =>
              setF({
                ...f,
                email: x.target.value
              })
            }
          />
        </label>

        <label>
          Password

          <input
            placeholder="Minimum 6 characters"
            type="password"
            minLength="6"
            required
            value={f.password}
            onChange={(x) =>
              setF({
                ...f,
                password: x.target.value
              })
            }
          />
        </label>

        <button className="primary auth-button">
          Create Account
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>

      </form>

    </div>
  );
}


/* =========================
   DASHBOARD
========================= */

function Dashboard() {

  const u = user();

  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [q, setQ] = useState("");

  async function load() {

    const complaints = await api.get(
      "/complaints",
      {
        params: {
          search: q
        }
      }
    );

    setItems(complaints.data);

    if (u.role === "ADMIN") {
      const dashboardStats =
        await api.get("/admin/stats");

      setStats(dashboardStats.data);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>

      <header className="dashboard-header">

        <div>
          <p className="eyebrow">
            {u.role === "ADMIN"
              ? "ADMIN PANEL"
              : "USER DASHBOARD"}
          </p>

          <h1>
            {u.role === "USER"
              ? "My Complaints"
              : "Complaint Dashboard"}
          </h1>

          <p>
            Track and manage complaints from one place.
          </p>
        </div>

        {u.role === "USER" && (
          <Link
            className="primary new-complaint-btn"
            to="/new"
          >
            + New Complaint
          </Link>
        )}

      </header>


      {/* ADMIN STATISTICS */}

      {stats && (

        <div className="stats">

          {Object.entries(stats).map(
            ([k, v]) => (

              <div
                className="stat-card"
                key={k}
              >

                <b>
                  {v}
                </b>

                <small>
                  {k
                    .replaceAll("_", " ")
                    .toUpperCase()}
                </small>

              </div>

            )
          )}

        </div>

      )}


      {/* SEARCH */}

      <div className="search-box">

        <input
          placeholder="Search complaints..."
          value={q}
          onChange={(e) =>
            setQ(e.target.value)
          }
        />

        <button
          className="search-btn"
          onClick={load}
        >
          Search
        </button>

      </div>


      {/* COMPLAINT TABLE */}

      <div className="card table-card">

        <div className="table-header">
          <h2>
            Complaints
          </h2>

          <span>
            {items.length} complaint
            {items.length !== 1 ? "s" : ""}
          </span>
        </div>

        {items.length === 0 ? (

          <div className="empty-state">
            <h3>
              No complaints found
            </h3>

            <p>
              There are no complaints matching your search.
            </p>
          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned</th>
                </tr>

              </thead>

              <tbody>

                {items.map((c) => (

                  <tr key={c.id}>

                    <td>
                      <strong>
                        #{c.id}
                      </strong>
                    </td>

                    <td>
                      <Link
                        className="complaint-link"
                        to={`/complaints/${c.id}`}
                      >
                        {c.title}
                      </Link>
                    </td>

                    <td>
                      {c.category_name || "—"}
                    </td>

                    <td>
                      <span
                        className={`priority priority-${c.priority?.toLowerCase()}`}
                      >
                        {c.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status status-${c.status?.toLowerCase()}`}
                      >
                        {c.status?.replaceAll("_", " ")}
                      </span>
                    </td>

                    <td>
                      {c.assigned_name ||
                        "Unassigned"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </>
  );
}


/* =========================
   NEW COMPLAINT
========================= */

function New() {

  const nav = useNavigate();

  const [cats, setCats] = useState([]);

  const [f, setF] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    category_id: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {

    api
      .get("/complaints/categories")
      .then((r) => setCats(r.data))
      .catch(() =>
        setError("Unable to load categories")
      );

  }, []);

  async function go(e) {

    e.preventDefault();

    try {

      await api.post("/complaints", f);

      nav("/dashboard");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to submit complaint"
      );

    }
  }

  return (

    <>

      <div className="page-heading">

        <Link
          className="back-link"
          to="/dashboard"
        >
          ← Back to Dashboard
        </Link>

        <h1>
          Submit Complaint
        </h1>

        <p>
          Provide the details below to submit your complaint.
        </p>

      </div>


      <form
        className="card form complaint-form"
        onSubmit={go}
      >

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <label>
          Complaint Title

          <input
            required
            placeholder="e.g. Internet connection issue"
            value={f.title}
            onChange={(e) =>
              setF({
                ...f,
                title: e.target.value
              })
            }
          />

        </label>


        <label>
          Category

          <select
            required
            value={f.category_id}
            onChange={(e) =>
              setF({
                ...f,
                category_id: e.target.value
              })
            }
          >

            <option value="">
              Select a category
            </option>

            {cats.map((c) => (

              <option
                key={c.id}
                value={c.id}
              >
                {c.name}
              </option>

            ))}

          </select>

        </label>


        <label>
          Priority

          <select
            value={f.priority}
            onChange={(e) =>
              setF({
                ...f,
                priority: e.target.value
              })
            }
          >

            {[
              "LOW",
              "MEDIUM",
              "HIGH",
              "URGENT"
            ].map((x) => (

              <option
                key={x}
                value={x}
              >
                {x}
              </option>

            ))}

          </select>

        </label>


        <label>
          Description

          <textarea
            rows="8"
            required
            placeholder="Describe your complaint in detail..."
            value={f.description}
            onChange={(e) =>
              setF({
                ...f,
                description: e.target.value
              })
            }
          />

        </label>


        <button className="primary submit-btn">
          Submit Complaint
        </button>

      </form>

    </>

  );
}


/* =========================
   COMPLAINT DETAILS
========================= */

function Detail() {

  const { id } = useParams();

  const u = user();

  const [c, setC] = useState(null);

  const [comment, setComment] = useState("");

  const [error, setError] = useState("");


  async function load() {

    const response =
      await api.get(`/complaints/${id}`);

    setC(response.data);

  }


  useEffect(() => {

    load();

  }, [id]);


  async function add() {

    if (!comment.trim()) return;

    try {

      await api.post(
        `/complaints/${id}/comments`,
        {
          comment
        }
      );

      setComment("");

      load();

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to add comment"
      );

    }
  }


  if (!c) {
    return (
      <p className="loading">
        Loading complaint...
      </p>
    );
  }


  return (

    <>

      <Link
        className="back-link"
        to="/dashboard"
      >
        ← Back to Dashboard
      </Link>


      <div className="detail-grid">


        {/* COMPLAINT */}

        <article className="card complaint-detail">

          <div className="detail-header">

            <div>

              <p className="eyebrow">
                COMPLAINT #{c.id}
              </p>

              <h1>
                {c.title}
              </h1>

            </div>

            <span
              className={`status status-${c.status?.toLowerCase()}`}
            >
              {c.status?.replaceAll("_", " ")}
            </span>

          </div>


          <div className="complaint-description">

            <h3>
              Description
            </h3>

            <p>
              {c.description}
            </p>

          </div>


          <div className="detail-info">

            <div>
              <small>
                Status
              </small>

              <strong>
                {c.status}
              </strong>
            </div>

            <div>
              <small>
                Priority
              </small>

              <strong>
                {c.priority}
              </strong>
            </div>

            <div>
              <small>
                Category
              </small>

              <strong>
                {c.category_name || "—"}
              </strong>
            </div>

          </div>


          {/* STAFF / ADMIN STATUS CONTROL */}

          {(u.role === "STAFF" ||
            u.role === "ADMIN") && (

            <div className="status-control">

              <label>
                Update Status

                <select
                  value={c.status}
                  onChange={async (e) => {

                    await api.patch(
                      `/complaints/${id}/status`,
                      {
                        status: e.target.value
                      }
                    );

                    load();

                  }}
                >

                  {[
                    "SUBMITTED",
                    "UNDER_REVIEW",
                    "ASSIGNED",
                    "IN_PROGRESS",
                    "RESOLVED",
                    "CLOSED"
                  ].map((s) => (

                    <option
                      key={s}
                      value={s}
                    >
                      {s.replaceAll("_", " ")}
                    </option>

                  ))}

                </select>

              </label>

            </div>

          )}

        </article>


        {/* COMMENTS */}

        <aside className="card comments-card">

          <h2>
            Comments
          </h2>

          {c.comments.length === 0 ? (

            <p className="muted">
              No comments yet.
            </p>

          ) : (

            c.comments.map((x) => (

              <div
                className="comment"
                key={x.id}
              >

                <b>
                  {x.user_name}
                </b>

                <p>
                  {x.comment}
                </p>

              </div>

            ))

          )}


          {error && (
            <p className="error">
              {error}
            </p>
          )}


          <textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

          <button
            className="primary"
            onClick={add}
          >
            Add Comment
          </button>

        </aside>

      </div>

    </>

  );
}


/* =========================
   APP ROUTES
========================= */

function App() {

  return (

    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <Guard>
            <Dashboard />
          </Guard>
        }
      />

      <Route
        path="/new"
        element={
          <Guard>
            <New />
          </Guard>
        }
      />

      <Route
        path="/complaints/:id"
        element={
          <Guard>
            <Detail />
          </Guard>
        }
      />

      <Route
        path="*"
        element={
          <Navigate to="/dashboard" />
        }
      />

    </Routes>

  );
}


/* =========================
   START APPLICATION
========================= */

createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);