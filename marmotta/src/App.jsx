import React, { useState } from 'react';
import {
  Wrench,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Lock,
  Trash2,
  Plus,
  Send
} from 'lucide-react';

const INITIAL_SERVICES = [
  {
    id: 1,
    nombre: 'Latonería',
    descripcion:
      'Reparación estructural y estética de abolladuras, golpes en paneles y recuperación de líneas originales de la carrocería.',
    icono: 'wrench'
  },
  {
    id: 2,
    nombre: 'Pintura Automotriz',
    descripcion:
      'Aplicación de pintura en cabina controlada, igualación exacta de colorimetría de fábrica y acabados de alto brillo.',
    icono: 'paintbrush'
  },
  {
    id: 3,
    nombre: 'Reparación de Daños',
    descripcion:
      'Atención integral de afectaciones estéticas ocasionadas por colisiones leves, roces urbanos e impactos.',
    icono: 'shield'
  },
  {
    id: 4,
    nombre: 'Mantenimiento Estético',
    descripcion:
      'Polichado profesional, restauración de faros, corrección de barniz y protección exterior del vehículo.',
    icono: 'sparkles'
  }
];

const INITIAL_WORKS = [
  {
    id: 1,
    titulo: 'Mazda 3 - Costado y Puerta Trasera',
    servicio: 'Latonería y Pintura',
    fecha: 'Octubre 2026',
    descripcion:
      'Desabollado técnico de puerta trasera derecha, preparación de superficie y repintado bicapa en cabina.',
    antesImg:
      'https://images.unsplash.com/photo-1597762470488-3877b1f538c6?auto=format&fit=crop&w=600&q=80',
    despuesImg:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    titulo: 'Toyota Corolla - Parachoques Frontal',
    servicio: 'Reparación de Daños',
    fecha: 'Septiembre 2026',
    descripcion:
      'Reconstrucción de defensa delantera tras impacto leve, nivelación y acabado perlado original.',
    antesImg:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    despuesImg:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    titulo: 'BMW Serie 3 - Corrección de Barniz',
    servicio: 'Mantenimiento Estético',
    fecha: 'Agosto 2026',
    descripcion:
      'Pulido en tres etapas para eliminar micro-rayones y devolver profundidad de espejo al color azul metálico.',
    antesImg:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80',
    despuesImg:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80'
  }
];

const INITIAL_REQUESTS = [
  {
    id: 101,
    nombre: 'Carlos Mendoza',
    correo: 'carlos.mendoza@ejemplo.com',
    telefono: '310 555 0192',
    vehiculo: 'Chevrolet Onix 2022',
    servicio: 'Latonería',
    mensaje: 'Tengo un golpe leve en el guardabarros delantero izquierdo y quisiera agendar valoración.',
    estado: 'Pendiente',
    fecha: '18/11/2026'
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiOutput, setAiOutput] = useState('');
  const [aiCustomPrompt, setAiCustomPrompt] = useState('');

  const [services, setServices] = useState(INITIAL_SERVICES);
  const [works, setWorks] = useState(INITIAL_WORKS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    vehiculo: '',
    servicio: 'Latonería',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const [adminView, setAdminView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminTab, setAdminTab] = useState('solicitudes');

  const [newWork, setNewWork] = useState({
    titulo: '',
    servicio: 'Latonería y Pintura',
    fecha: 'Noviembre 2026',
    descripcion: '',
    antesImg: '',
    despuesImg: ''
  });
  const [newService, setNewService] = useState({
    nombre: '',
    descripcion: ''
  });

  const renderIcon = (type) => {
    switch (type) {
      case 'paintbrush':
        return <Paintbrush size={24} />;
      case 'shield':
        return <ShieldCheck size={24} />;
      case 'sparkles':
        return <Sparkles size={24} />;
      default:
        return <Wrench size={24} />;
    }
  };

  const handleSelectService = (serviceName) => {
    setFormData((prev) => ({ ...prev, servicio: serviceName }));
    const contactEl = document.getElementById('contacto');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const nuevaSolicitud = {
      id: Date.now(),
      ...formData,
      estado: 'Pendiente',
      fecha: new Date().toLocaleDateString('es-CO')
    };
    setRequests([nuevaSolicitud, ...requests]);
    setSubmitted(true);
    setFormData({
      nombre: '',
      correo: '',
      telefono: '',
      vehiculo: '',
      servicio: 'Latonería',
      mensaje: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleGenerateAi = (presetType) => {
    if (presetType === 'galeria') {
      setAiOutput(
        'Descripción sugerida para galería:\n"Restauración completa de panel lateral con técnica de desabollado sin pérdida de línea original y pintura bicapa en cabina presurizada. Acabado espejo con garantía de colorimetría exacta."'
      );
    } else if (presetType === 'promo') {
      setAiOutput(
        'Texto promocional para servicios:\n"¿Tu vehículo sufrió un roce o perdió su brillo original? En Marmotta devolvemos la estética de fábrica con procesos certificados de latonería y pintura automotriz. ¡Solicita tu valoración hoy!"'
      );
    } else if (presetType === 'redes') {
      setAiOutput(
        'Idea para Instagram / Facebook:\n"✨ ¡De impacto urbano a acabado de concesionario! Desliza para ver el antes y después de esta intervención en Marmotta. Cuidamos cada detalle de tu carrocería. 🚗💎 #MarmottaTaller #LatoneriaYPintura"'
      );
    } else if (aiCustomPrompt.trim()) {
      setAiOutput(
        `Propuesta comercial basada en "${aiCustomPrompt}":\n"En Marmotta transformamos la apariencia de tu automóvil combinando precisión técnica en latonería, igualación exacta de pintura y atención personalizada para que conduzcas con total orgullo."`
      );
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginUser === 'admin' && loginPass === 'marmotta2026') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas. Usa admin / marmotta2026');
    }
  };

  const handleAddWork = (e) => {
    e.preventDefault();
    if (!newWork.titulo || !newWork.descripcion) return;
    setWorks([
      {
        id: Date.now(),
        ...newWork,
        antesImg:
          newWork.antesImg ||
          'https://images.unsplash.com/photo-1597762470488-3877b1f538c6?auto=format&fit=crop&w=600&q=80',
        despuesImg:
          newWork.despuesImg ||
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80'
      },
      ...works
    ]);
    setNewWork({
      titulo: '',
      servicio: 'Latonería y Pintura',
      fecha: 'Noviembre 2026',
      descripcion: '',
      antesImg: '',
      despuesImg: ''
    });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newService.nombre || !newService.descripcion) return;
    setServices([
      ...services,
      {
        id: Date.now(),
        nombre: newService.nombre,
        descripcion: newService.descripcion,
        icono: 'wrench'
      }
    ]);
    setNewService({ nombre: '', descripcion: '' });
  };

  const updateRequestStatus = (id, nuevoEstado) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r)));
  };

  return (
    <div>
      <header className="site-header">
        <a
          href="#inicio"
          className="brand"
          onClick={() => {
            setAdminView(false);
            setMenuOpen(false);
          }}
        >
          <span className="brand-mark">M</span>
          <div>
            <strong>MARMOTTA</strong>
            <small>LATONERÍA Y PINTURA</small>
          </div>
        </a>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a
            href="#inicio"
            onClick={() => {
              setAdminView(false);
              setMenuOpen(false);
            }}
          >
            Inicio
          </a>
          <a
            href="#servicios"
            onClick={() => {
              setAdminView(false);
              setMenuOpen(false);
            }}
          >
            Servicios
          </a>
          <a
            href="#trabajos"
            onClick={() => {
              setAdminView(false);
              setMenuOpen(false);
            }}
          >
            Trabajos
          </a>
          <a
            href="#contacto"
            onClick={() => {
              setAdminView(false);
              setMenuOpen(false);
            }}
          >
            Contacto
          </a>
        </nav>

        <button className="ai-header-button" onClick={() => setAiOpen(true)}>
          <Sparkles size={16} />
          Asistente IA
        </button>

        <button
          className="menu-button"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {!adminView ? (
        <main>
          <section id="inicio" className="hero">
            <div className="hero-overlay" />
            <div className="hero-content">
              <p className="eyebrow">TALLER AUTOMOTRIZ ESPECIALIZADO</p>
              <h1>Precisión y acabado impecable para tu vehículo.</h1>
              <p className="hero-text">
                En Marmotta somos especialistas en latonería, pintura automotriz y reparación
                estética. Recuperamos la apariencia original de tu automóvil con procesos
                profesionales y atención transparente.
              </p>
              <div className="hero-actions">
                <a href="#servicios" className="button primary">
                  Ver servicios <ArrowRight size={17} />
                </a>
                <a href="#contacto" className="button secondary">
                  Solicitar atención
                </a>
              </div>
            </div>
            <div className="hero-badge">
              <CheckCircle2 size={18} color="#00a878" />
              <span>Colorimetría certificada y acabados garantizados</span>
            </div>
          </section>

          <section id="servicios" className="section services-section">
            <div className="section-heading">
              <p className="eyebrow green">CATÁLOGO DE ATENCIÓN</p>
              <h2>Nuestros Servicios</h2>
              <p>
                Soluciones integrales para el cuidado, reparación y renovación estética de la
                carrocería de tu automóvil.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <article key={service.id} className="service-card">
                  <div className="icon-box">{renderIcon(service.icono)}</div>
                  <h3>{service.nombre}</h3>
                  <p>{service.descripcion}</p>
                  <button onClick={() => handleSelectService(service.nombre)}>
                    Solicitar este servicio <ArrowRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section id="trabajos" className="section works-section">
            <div className="section-heading split">
              <div>
                <p className="eyebrow green">EVIDENCIA VISUAL</p>
                <h2>Trabajos Realizados</h2>
              </div>
              <p>
                Conoce los resultados de nuestras intervenciones mediante comparativas reales del
                antes y después en el taller.
              </p>
            </div>

            <div className="work-grid">
              {works.map((work) => (
                <article key={work.id} className="work-card">
                  <div className="comparison">
                    <div className="photo-placeholder">
                      <span className="photo-badge">ANTES</span>
                      <img src={work.antesImg} alt={`Antes - ${work.titulo}`} />
                    </div>
                    <div className="photo-placeholder after">
                      <span className="photo-badge">DESPUÉS</span>
                      <img src={work.despuesImg} alt={`Después - ${work.titulo}`} />
                    </div>
                  </div>
                  <div className="work-content">
                    <span>
                      {work.servicio.toUpperCase()} • {work.fecha}
                    </span>
                    <h3>{work.titulo}</h3>
                    <p>{work.descripcion}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="contacto" className="contact-section">
            <div className="contact-inner">
              <div className="contact-copy">
                <p className="eyebrow">ATENCIÓN PERSONALIZADA</p>
                <h2>Agenda la valoración de tu vehículo</h2>
                <p>
                  Cuéntanos qué servicio necesitas y los datos de tu automóvil. Nuestro equipo
                  registrará tu solicitud y se pondrá en contacto contigo a la brevedad.
                </p>
                <div className="contact-note">
                  <ShieldCheck size={22} color="#00a878" />
                  <div>
                    <strong>Compromiso Marmotta:</strong> Diagnóstico claro, seguimiento directo y
                    acabados de alta calidad en cada entrega.
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <label>
                    Nombre del cliente
                    <input
                      type="text"
                      required
                      placeholder="Ej. Laura Gómez"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  </label>
                  <label>
                    Correo electrónico
                    <input
                      type="email"
                      required
                      placeholder="correo@ejemplo.com"
                      value={formData.correo}
                      onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Número de teléfono
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 300 123 4567"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </label>
                  <label>
                    Vehículo (Marca / Modelo / Año)
                    <input
                      type="text"
                      required
                      placeholder="Ej. Renault Duster 2021"
                      value={formData.vehiculo}
                      onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value })}
                    />
                  </label>
                </div>

                <label>
                  Servicio de interés
                  <select
                    value={formData.servicio}
                    onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.nombre}>
                        {s.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Descripción o mensaje adicional
                  <textarea
                    rows="3"
                    required
                    placeholder="Describe el daño o el trabajo estético que deseas realizar..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  />
                </label>

                <button type="submit" className="button primary full">
                  <Send size={16} /> Enviar solicitud
                </button>

                {submitted && (
                  <p className="success-message">
                    ✓ Tu solicitud fue registrada correctamente. Puedes consultarla desde el Panel
                    Administrativo.
                  </p>
                )}
              </form>
            </div>
          </section>
        </main>
      ) : (
        <section className="admin-section">
          {!isAuthenticated ? (
            <div className="admin-card" style={{ maxWidth: '420px', margin: '40px auto' }}>
              <p className="eyebrow green">ACCESO RESTRINGIDO</p>
              <h2 style={{ marginTop: 0 }}>Panel Administrativo</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
                Ingresa tus credenciales para gestionar trabajos, servicios y solicitudes.
              </p>
              <form className="contact-form" style={{ padding: 0, boxShadow: 'none' }} onSubmit={handleAdminLogin}>
                <label>
                  Usuario
                  <input
                    type="text"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    placeholder="admin"
                    required
                  />
                </label>
                <label>
                  Contraseña
                  <input
                    type="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="marmotta2026"
                    required
                  />
                </label>
                {loginError && (
                  <p style={{ color: '#c62828', fontSize: '13px', fontWeight: 700 }}>{loginError}</p>
                )}
                <button type="submit" className="button primary full">
                  Iniciar sesión
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <p className="eyebrow green">GESTIÓN INTERNA</p>
                  <h2 style={{ margin: 0 }}>Panel de Administración Marmotta</h2>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="button primary" onClick={() => setAiOpen(true)}>
                    <Sparkles size={16} /> Abrir Asistente IA
                  </button>
                  <button
                    className="admin-tab"
                    onClick={() => {
                      setIsAuthenticated(false);
                      setAdminView(false);
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>

              <div className="admin-tabs">
                <button
                  className={`admin-tab ${adminTab === 'solicitudes' ? 'active' : ''}`}
                  onClick={() => setAdminTab('solicitudes')}
                >
                  Solicitudes ({requests.length})
                </button>
                <button
                  className={`admin-tab ${adminTab === 'trabajos' ? 'active' : ''}`}
                  onClick={() => setAdminTab('trabajos')}
                >
                  Trabajos ({works.length})
                </button>
                <button
                  className={`admin-tab ${adminTab === 'servicios' ? 'active' : ''}`}
                  onClick={() => setAdminTab('servicios')}
                >
                  Servicios ({services.length})
                </button>
              </div>

              {adminTab === 'solicitudes' && (
                <div className="admin-card">
                  <h3>Solicitudes de Clientes</h3>
                  {requests.map((req) => (
                    <div
                      key={req.id}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        padding: '16px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '16px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div>
                        <strong>{req.nombre}</strong> — <span style={{ color: 'var(--royal)' }}>{req.vehiculo}</span>
                        <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                          {req.correo} • {req.telefono} • Servicio: <strong>{req.servicio}</strong> ({req.fecha})
                        </div>
                        <p style={{ margin: '8px 0 0', fontSize: '14px' }}>{req.mensaje}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="badge-status">{req.estado}</span>
                        <select
                          value={req.estado}
                          onChange={(e) => updateRequestStatus(req.id, e.target.value)}
                          style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--border)' }}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En revisión">En revisión</option>
                          <option value="Atendida">Atendida</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {adminTab === 'trabajos' && (
                <div className="admin-card">
                  <h3>Registrar Nuevo Trabajo (Antes y Después)</h3>
                  <form className="contact-form" style={{ padding: 0, boxShadow: 'none', marginBottom: '28px' }} onSubmit={handleAddWork}>
                    <div className="form-row">
                      <label>
                        Título del trabajo
                        <input
                          type="text"
                          required
                          placeholder="Ej. Kia Sportage - Puerta Delantera"
                          value={newWork.titulo}
                          onChange={(e) => setNewWork({ ...newWork, titulo: e.target.value })}
                        />
                      </label>
                      <label>
                        Tipo de servicio
                        <input
                          type="text"
                          required
                          value={newWork.servicio}
                          onChange={(e) => setNewWork({ ...newWork, servicio: e.target.value })}
                        />
                      </label>
                    </div>
                    <div className="form-row">
                      <label>
                        URL Foto Antes (opcional)
                        <input
                          type="url"
                          placeholder="https://..."
                          value={newWork.antesImg}
                          onChange={(e) => setNewWork({ ...newWork, antesImg: e.target.value })}
                        />
                      </label>
                      <label>
                        URL Foto Después (opcional)
                        <input
                          type="url"
                          placeholder="https://..."
                          value={newWork.despuesImg}
                          onChange={(e) => setNewWork({ ...newWork, despuesImg: e.target.value })}
                        />
                      </label>
                    </div>
                    <label>
                      Descripción del trabajo
                      <textarea
                        rows="2"
                        required
                        placeholder="Describe el procedimiento realizado..."
                        value={newWork.descripcion}
                        onChange={(e) => setNewWork({ ...newWork, descripcion: e.target.value })}
                      />
                    </label>
                    <button type="submit" className="button primary">
                      <Plus size={16} /> Publicar en galería
                    </button>
                  </form>

                  <h3>Trabajos Publicados</h3>
                  {works.map((w) => (
                    <div
                      key={w.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 0',
                        borderBottom: '1px solid var(--border)'
                      }}
                    >
                      <div>
                        <strong>{w.titulo}</strong> ({w.servicio})
                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>{w.descripcion}</p>
                      </div>
                      <button
                        onClick={() => setWorks(works.filter((item) => item.id !== w.id))}
                        style={{ background: '#fee2e2', color: '#b91c1c', border: 0, padding: '8px', borderRadius: '8px' }}
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {adminTab === 'servicios' && (
                <div className="admin-card">
                  <h3>Agregar Servicio al Catálogo</h3>
                  <form className="contact-form" style={{ padding: 0, boxShadow: 'none', marginBottom: '24px' }} onSubmit={handleAddService}>
                    <label>
                      Nombre del servicio
                      <input
                        type="text"
                        required
                        placeholder="Ej. Detailing Interior y Cerámico"
                        value={newService.nombre}
                        onChange={(e) => setNewService({ ...newService, nombre: e.target.value })}
                      />
                    </label>
                    <label>
                      Descripción breve
                      <textarea
                        rows="2"
                        required
                        value={newService.descripcion}
                        onChange={(e) => setNewService({ ...newService, descripcion: e.target.value })}
                      />
                    </label>
                    <button type="submit" className="button primary">
                      <Plus size={16} /> Agregar servicio
                    </button>
                  </form>

                  {services.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 0',
                        borderBottom: '1px solid var(--border)'
                      }}
                    >
                      <div>
                        <strong>{s.nombre}</strong>
                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>{s.descripcion}</p>
                      </div>
                      <button
                        onClick={() => setServices(services.filter((item) => item.id !== s.id))}
                        style={{ background: '#fee2e2', color: '#b91c1c', border: 0, padding: '8px', borderRadius: '8px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      <footer className="footer">
        <div>
          <span className="footer-brand">MARMOTTA</span>
          <p>Taller de latonería, pintura y estética automotriz.</p>
        </div>

        <div className="footer-links">
          <a href="#servicios" onClick={() => setAdminView(false)}>
            Servicios
          </a>
          <a href="#trabajos" onClick={() => setAdminView(false)}>
            Trabajos
          </a>
          <a href="#contacto" onClick={() => setAdminView(false)}>
            Contacto
          </a>
          <button
            onClick={() => {
              setAdminView(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Lock size={13} /> Administración
          </button>
        </div>

        <div className="copyright">
          <p>© 2026 Marmotta. Todos los derechos reservados.</p>
        </div>
      </footer>

      <button className="ai-floating" onClick={() => setAiOpen(true)}>
        <Sparkles size={18} />
        Asistente IA
      </button>

      {aiOpen && (
        <div className="modal-backdrop" onClick={() => setAiOpen(false)}>
          <div className="ai-panel" onClick={(e) => e.stopPropagation()}>
            <div className="ai-panel-header">
              <div>
                <span className="ai-label">
                  <Sparkles size={13} /> ASISTENTE CREATIVO MARMOTTA
                </span>
                <h3>Generador de Contenido</h3>
              </div>
              <button onClick={() => setAiOpen(false)} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>

            <p className="ai-intro">
              Genera descripciones para la galería, textos comerciales o ideas para redes sociales
              del taller (no realiza cotizaciones ni diagnósticos mecánicos).
            </p>

            <div className="ai-options">
              <button onClick={() => handleGenerateAi('galeria')}>
                Crear descripción para trabajo en galería
              </button>
              <button onClick={() => handleGenerateAi('promo')}>
                Proponer texto promocional de servicios
              </button>
              <button onClick={() => handleGenerateAi('redes')}>
                Generar publicación para redes sociales
              </button>
            </div>

            <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ej. Promoción pulido de faros..."
                value={aiCustomPrompt}
                onChange={(e) => setAiCustomPrompt(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '9px',
                  border: '1px solid var(--border)'
                }}
              />
              <button
                className="button primary"
                style={{ padding: '10px 14px' }}
                onClick={() => handleGenerateAi('custom')}
              >
                Crear
              </button>
            </div>

            {aiOutput && <div className="ai-result-box">{aiOutput}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
