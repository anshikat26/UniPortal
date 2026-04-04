import { useState, useEffect } from "react";
import "./Notices.css";

function Notices() {
  const [search, setSearch] = useState("");
  const [notices, setNotices] = useState([]);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/notices")
      .then(res => res.json())
      .then(data => {
        const updated = data.map((item) => ({
          ...item,
          tag: item.title.toLowerCase().includes("exam")
            ? "important"
            : item.title.toLowerCase().includes("hackathon")
            ? "hot"
            : "normal",
        }));

        setNotices(updated);
      })
      .catch(err => console.log(err));
  }, []);

  const filtered = notices.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="top-strip"></div>

      <div className="notice-page">

        <h2 className="notice-heading">📢 Notices</h2>

        <div className="notice-search">
          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="trending-wrapper">
          <h3 className="trending-title">🔥 Trending</h3>
        </div>

        <div className="notice-list">
          {filtered.length > 0 ? (
            filtered.map((notice, index) => (
              <div key={index} className="notice-card">

                <div className="notice-header">
                  <h3>{notice.title}</h3>

                  {notice.tag === "hot" && (
                    <span className="tag hot">🔥 HOT</span>
                  )}
                  {notice.tag === "important" && (
                    <span className="tag important">⭐ Important</span>
                  )}
                </div>

                <p className="date">
                  📅 {new Date(notice.date).toDateString()}
                </p>

                <p className="desc">
                  {notice.description}
                </p>

                {notice.formLink && (
                  <a
                    href={
                      notice.formLink.startsWith("http")
                        ? notice.formLink
                        : `https://${notice.formLink}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    Fill Form →
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No notices available</p>
          )}
        </div>

      </div>
    </>
  );
}

export default Notices;