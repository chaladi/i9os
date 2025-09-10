class FetchClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(endpoint, options = {}) {
    return this.request('GET', endpoint, options);
  }

  async post(endpoint, data, options = {}) {
    return this.request('POST', endpoint, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request('PUT', endpoint, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, options);
  }

  async request(method, endpoint, options) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method,
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Try to parse error response
        throw new Error(`HTTP error! status: ${response.status}`, { cause: errorData });
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Re-throw to allow calling code to handle it
    }
  }
}

// Usage example:
const api = new FetchClient('https://jsonplaceholder.typicode.com');

async function fetchData() {
  try {
    // Dynamic GET request
    const posts = await api.get('/posts?_limit=5');
    console.log('Fetched posts:', posts);

    // Dynamic POST request
    const newPost = {
      title: 'My New Post',
      body: 'This is the content of my new post.',
      userId: 1,
    };
    const createdPost = await api.post('/posts', newPost);
    console.log('Created post:', createdPost);

  } catch (error) {
    console.error('Error in data fetching:', error);
  }
}

fetchData();
