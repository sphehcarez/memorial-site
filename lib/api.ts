const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = API_BASE_URL
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("adminToken")
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    return headers
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    }

    try {
      console.log(`Making request to: ${url}`)
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        if (response.status === 401) {
          // For 401, return a special object instead of throwing
          return { success: false, error: errorData.detail || "Invalid credentials" } as any;
        }
        if (response.status !== 401 && errorData && Object.keys(errorData).length > 0) {
          console.error(`API Error: ${response.status}`, errorData)
        }
        throw new Error(
          errorData.detail ||
          errorData.error ||
          (response.status === 500
            ? "Internal server error. Please try again later."
            : `HTTP error! status: ${response.status}`)
        )
      }

      const data = await response.json()
      console.log(`Response from ${endpoint}:`, data)
      return data
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Auth methods
  async login(username: string, password: string) {
    try {
      const response = await this.request<any>("/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      })

      if (response.success && response.token) {
        this.token = response.token
        if (typeof window !== "undefined") {
          localStorage.setItem("adminToken", response.token)
          localStorage.setItem("adminUser", JSON.stringify(response.user))
        }
        return { success: true, token: response.token, user: response.user }
      } else {
        return { success: false, error: response.detail || response.error || "Login failed" }
      }
    } catch (error: any) {
      console.error("Login error:", error)
      return { success: false, error: error.message || "Network error. Please check if the backend server is running." }
    }
  }

  // Condolences methods
  async getCondolences(status?: string, limit = 50, offset = 0) {
    const params = new URLSearchParams()
    if (status) params.append("status", status)
    params.append("limit", limit.toString())
    params.append("offset", offset.toString())

    return this.request<any[]>(`/api/admin/condolences?${params}`)
  }

  async getPublicCondolences(limit = 50, offset = 0) {
    const params = new URLSearchParams()
    params.append("limit", limit.toString())
    params.append("offset", offset.toString())

    return this.request<any[]>(`/api/condolences?${params}`)
  }

  async submitCondolence(data: any) {
    return this.request<any>("/api/condolences", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        ipAddress: "127.0.0.1",
        userAgent: navigator.userAgent,
      }),
    })
  }

  async updateCondolenceStatus(id: number, status: string, notes?: string) {
    return this.request<any>(`/api/admin/condolences/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, notes }),
    })
  }

  // Tributes methods
  async getTributes(status?: string, limit = 50, offset = 0) {
    const params = new URLSearchParams()
    if (status) params.append("status", status)
    params.append("limit", limit.toString())
    params.append("offset", offset.toString())

    return this.request<any[]>(`/api/admin/tributes?${params}`)
  }

  async getPublicTributes(limit = 50, offset = 0) {
    const params = new URLSearchParams()
    params.append("limit", limit.toString())
    params.append("offset", offset.toString())

    return this.request<any[]>(`/api/tributes?${params}`)
  }

  async submitTribute(data: any) {
    return this.request<any>("/api/tributes", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        ipAddress: "127.0.0.1",
        userAgent: navigator.userAgent,
      }),
    })
  }

  async updateTributeStatus(id: number, status: string, notes?: string) {
    return this.request<any>(`/api/admin/tributes/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, notes }),
    })
  }

  // Accreditations methods
  async getAccreditations(status?: string, category?: string, limit = 50, offset = 0) {
    const params = new URLSearchParams()
    if (status) params.append("status", status)
    if (category) params.append("category", category)
    params.append("limit", limit.toString())
    params.append("offset", offset.toString())

    return this.request<any[]>(`/api/admin/accreditations?${params}`)
  }

  async submitAccreditation(data: any) {
    return this.request<any>("/api/accreditations", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        ipAddress: "127.0.0.1",
        userAgent: navigator.userAgent,
      }),
    })
  }

  async updateAccreditationStatus(id: number, status: string, notes?: string) {
    return this.request<any>(`/api/admin/accreditations/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, notes }),
    })
  }

  // Gallery methods
  async getGalleryItems(category?: string, limit = 50, offset = 0) {
    const params = new URLSearchParams()
    if (category) params.append("category", category)
    params.append("limit", limit.toString())
    params.append("offset", offset.toString())

    return this.request<any[]>(`/api/gallery?${params}`)
  }

  async createGalleryItem(data: any) {
    return this.request<any>("/api/admin/gallery", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // PDF download method
  async downloadGalleryPDF(category: string, items: any[]) {
    try {
      const response = await fetch(`${this.baseURL}/api/gallery/download-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          items,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.blob()
    } catch (error) {
      console.error("PDF download error:", error)
      throw error
    }
  }

  // Dashboard method
  async getDashboardData(): Promise<{
    stats: any;
    recentActivity: Array<{
      id: number;
      type: string;
      user: string;
      action: string;
      time: string;
    }>;
  }> {
    const data = await this.request<any>("/api/admin/dashboard");
    // Flatten recentActivity object into a single array with type
    const recentActivity: any[] = [];
    if (data.recentActivity) {
      for (const [type, items] of Object.entries(data.recentActivity)) {
        if (Array.isArray(items)) {
          for (const item of items) {
            recentActivity.push({ ...item, type });
          }
        }
      }
    }
    return { ...data, recentActivity };
  }
}

export const apiClient = new ApiClient()
export default apiClient
