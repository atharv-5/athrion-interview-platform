import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

const readData = (collection) => {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error(`Error reading local collection ${collection}:`, err);
    return [];
  }
};

const writeData = (collection, data) => {
  const filePath = getFilePath(collection);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing local collection ${collection}:`, err);
    return false;
  }
};

export const localDb = {
  // Users Collection
  users: {
    find: () => readData('users'),
    findOne: (query) => {
      const users = readData('users');
      return users.find(u => {
        for (let key in query) {
          if (u[key] !== query[key]) return false;
        }
        return true;
      });
    },
    findById: (id) => {
      const users = readData('users');
      return users.find(u => u._id === id);
    },
    create: (user) => {
      const users = readData('users');
      const newUser = {
        _id: `user_${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...user
      };
      users.push(newUser);
      writeData('users', users);
      return newUser;
    }
  },

  // Resumes Collection
  resumes: {
    findOne: (query) => {
      const resumes = readData('resumes');
      return resumes.find(r => {
        for (let key in query) {
          if (r[key] !== query[key]) return false;
        }
        return true;
      });
    },
    createOrUpdate: (userId, resumeData) => {
      const resumes = readData('resumes');
      const existingIdx = resumes.findIndex(r => r.userId === userId);
      
      const record = {
        userId,
        updatedAt: new Date().toISOString(),
        ...resumeData
      };

      if (existingIdx !== -1) {
        resumes[existingIdx] = { ...resumes[existingIdx], ...record };
        writeData('resumes', resumes);
        return resumes[existingIdx];
      } else {
        const newRecord = {
          _id: `resume_${Date.now()}`,
          createdAt: new Date().toISOString(),
          ...record
        };
        resumes.push(newRecord);
        writeData('resumes', resumes);
        return newRecord;
      }
    }
  },

  // Interviews Collection
  interviews: {
    find: (query) => {
      const interviews = readData('interviews');
      return interviews.filter(i => {
        for (let key in query) {
          if (i[key] !== query[key]) return false;
        }
        return true;
      });
    },
    findById: (id) => {
      const interviews = readData('interviews');
      return interviews.find(i => i._id === id);
    },
    create: (interview) => {
      const interviews = readData('interviews');
      const newInterview = {
        _id: `session_${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...interview
      };
      interviews.push(newInterview);
      writeData('interviews', interviews);
      return newInterview;
    },
    findByIdAndUpdate: (id, updates) => {
      const interviews = readData('interviews');
      const idx = interviews.findIndex(i => i._id === id);
      if (idx !== -1) {
        interviews[idx] = { ...interviews[idx], ...updates, updatedAt: new Date().toISOString() };
        writeData('interviews', interviews);
        return interviews[idx];
      }
      return null;
    }
  }
};
