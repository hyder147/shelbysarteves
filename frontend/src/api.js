const BASE = '/api'

// Wraps fetch so network failures (backend down, offline, DNS, CORS) surface
// as the same kind of friendly error as a bad HTTP status, instead of an
// unhandled exception or a raw "Failed to fetch" in the console.
async function safeFetch(path, options) {
  let res
  try {
    res = await fetch(`${BASE}${path}`, options)
  } catch (err) {
    throw new Error('Could not reach the server. Check your connection and try again.')
  }

  let data = null
  try {
    data = await res.json()
  } catch (err) {
    // Non-JSON response (e.g. a proxy error page). Fall through with no data.
  }

  if (!res.ok) {
    throw new Error((data && data.error) || `Something went wrong (${res.status}). Please try again.`)
  }
  return data
}

export async function fetchServices() {
  return safeFetch('/services', { method: 'GET' })
}

export async function submitLead(payload) {
  return safeFetch('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export async function submitFeedback(payload) {
  return safeFetch('/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export async function fetchFeedbackSummary() {
  return safeFetch('/feedback/summary', { method: 'GET' })
}

export async function recordPageview() {
  // Best-effort, first-party, cookie-free page view count. Failures here
  // should never affect the visitor, so we swallow errors.
  try {
    await safeFetch('/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname, referrer: document.referrer || '' }),
    })
  } catch (err) {
    // ignored on purpose
  }
}
