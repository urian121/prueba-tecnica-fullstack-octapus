// Configuración base de Axios para llamadas al backend Django
import axios from 'axios';

// Crear instancia de Axios con configuración base
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',  // URL del backend Django
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// ALERTS - Endpoints de Alertas
// ============================================

/**
 * Obtener lista de alertas con filtros y paginación
 * @param {Object} params - Parámetros de filtrado
 * @param {string} params.severity - Filtro por severidad (low/medium/high/critical)
 * @param {string} params.status - Filtro por estado (open/in_progress/closed)
 * @param {string} params.search - Búsqueda por título
 * @param {number} params.page - Número de página
 * @returns {Promise} - Promesa con datos de alertas
 */
export const getAlerts = async (params = {}, options = {}) => {
  try {
    const response = await api.get('/alerts/', { params, signal: options.signal });
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

/**
 * Obtener detalle de una alerta específica
 * @param {number} id - ID de la alerta
 * @returns {Promise} - Promesa con datos de la alerta
 */
export const getAlertById = async (id) => {
  try {
    const response = await api.get(`/alerts/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alert detail:', error);
    throw error;
  }
};

// ============================================
// EVIDENCES - Endpoints de Evidencias
// ============================================

/**
 * Obtener evidencias de una alerta específica
 * @param {number} alertId - ID de la alerta
 * @param {number} page - Número de página
 * @returns {Promise} - Promesa con datos de evidencias
 */
export const getAlertEvidences = async (alertId, page = 1) => {
  try {
    const response = await api.get(`/alerts/${alertId}/evidences/`, {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching evidences:', error);
    throw error;
  }
};

/**
 * Actualizar estado de revisión de una evidencia
 * @param {number} id - ID de la evidencia
 * @param {boolean} isReviewed - Estado de revisión
 * @returns {Promise} - Promesa con datos actualizados
 */
export const updateEvidenceReview = async (id, isReviewed) => {
  try {
    // IMPORTANTE: La URL debe terminar en / para evitar el Bug 2
    const response = await api.patch(`/evidences/${id}/`, {
      is_reviewed: isReviewed
    });
    return response.data;
  } catch (error) {
    console.error('Error updating evidence review:', error);
    throw error;
  }
};

// Exportar instancia de axios por si se necesita en otro lugar
export default api;
