const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const backendDir = path.join(__dirname, '..');
const testDbPath = path.join(backendDir, 'test-app.db');
const port = 5150;

async function waitForServer(url, attempts = 25) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch (error) {
      // Retry until the server is ready.
    }

    await new Promise(resolve => setTimeout(resolve, 250));
  }

  throw new Error('Server did not start in time.');
}

async function waitForCategories(url, attempts = 25) {
  for (let index = 0; index < attempts; index += 1) {
    const response = await fetch(url);
    const categories = await response.json();

    if (Array.isArray(categories) && categories.length >= 5) {
      return categories;
    }

    await new Promise(resolve => setTimeout(resolve, 250));
  }

  throw new Error('Seeded categories were not ready in time.');
}

async function run() {
  try {
    fs.unlinkSync(testDbPath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  process.env.PORT = String(port);
  process.env.DB_PATH = testDbPath;

  const { startServer } = require('../server');
  const server = startServer(port);

  try {
    await waitForServer(`http://127.0.0.1:${port}/health`);

    const healthResponse = await fetch(`http://127.0.0.1:${port}/health`);
    assert.equal(healthResponse.status, 200);
    const healthData = await healthResponse.json();
    assert.equal(healthData.status, 'ok');

    const categories = await waitForCategories(`http://127.0.0.1:${port}/categories`);
    assert.ok(Array.isArray(categories));
    assert.ok(categories.length >= 5);
    assert.ok(categories.some(category => category.name === 'Web Development'));

    console.log('All API smoke tests passed.');
  } finally {
    server.close();

    try {
      fs.unlinkSync(testDbPath);
    } catch (error) {
      if (!['ENOENT', 'EBUSY', 'EPERM'].includes(error.code)) {
        throw error;
      }
    }
  }

  process.exit(0);
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
