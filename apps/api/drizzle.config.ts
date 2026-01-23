import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle',
    dialect: 'turso',
    dbCredentials: {
        url: 'libsql://resume-builder-adnanshahria19.aws-ap-south-1.turso.io',
        authToken: 'eyJhIjoicnciLCJpYXQiOjE3NjkxMDgyMTksImlkIjoiYTc1MjI2OWEtZjU4Yy00NDk5LWFhZmEtMzZkMTg1MmQ1ZDFmIiwicmlkIjoiOWMwNTk3ZDctZGRmZi00Njk2LTgxNDMtM2MzZmZhY2MwODA5In0',
    },
});
