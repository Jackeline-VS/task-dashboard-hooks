import { memo } from 'react'
function StatsCards({ total, pendientes, completadas, progreso }) {
  return (
    <section className="stats">
      <div className="stat">
        <span className="stat-icon">📋</span>
        <div>
          <p className="stat-label">Total</p>
          <p className="stat-value">{total}</p>
        </div>
      </div>
      <div className="stat">
        <span className="stat-icon">⏳</span>
        <div>
          <p className="stat-label">Pendientes</p>
          <p className="stat-value">{pendientes}</p>
        </div>
      </div>
      <div className="stat">
        <span className="stat-icon">✅</span>
        <div>
          <p className="stat-label">Completadas</p>
          <p className="stat-value">{completadas}</p>
        </div>
      </div>
      <div className="stat">
        <span className="stat-icon">📈</span>
        <div className="stat-progress">
          <p className="stat-label">Progreso</p>
          <p className="stat-value">{progreso}%</p>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(StatsCards)