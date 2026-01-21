import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sessionsData = JSON.parse(fs.readFileSync('/home/ubuntu/scrape_ra_sessions.json', 'utf8'));

async function importSessions() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);
  
  console.log('Starting Ra Material import...');
  console.log(`Found ${sessionsData.results.length} sessions to import`);
  
  let imported = 0;
  let errors = 0;
  
  for (const result of sessionsData.results) {
    if (result.error) {
      console.log(`Skipping ${result.input} due to error: ${result.error}`);
      errors++;
      continue;
    }
    
    const { session_id, title, session_date, content, original_url } = result.output;
    
    // Determine session number
    let sessionNumber;
    if (session_id === 'intro') {
      sessionNumber = 0;
    } else if (session_id === 'epilogue') {
      sessionNumber = 107;
    } else {
      sessionNumber = parseInt(session_id, 10);
    }
    
    // Read content from file
    let contentText = '';
    try {
      // Try the original path first
      if (fs.existsSync(content)) {
        contentText = fs.readFileSync(content, 'utf8');
      } else {
        // Try extracted path
        const filename = path.basename(content);
        const extractedPath = `/home/ubuntu/content_extracted/${filename}`;
        if (fs.existsSync(extractedPath)) {
          contentText = fs.readFileSync(extractedPath, 'utf8');
        } else {
          // Find file by session number
          const files = fs.readdirSync('/home/ubuntu/content_extracted');
          const matchingFile = files.find(f => f.startsWith(`${sessionNumber}_`) || f.startsWith(`${session_id}_`));
          if (matchingFile) {
            contentText = fs.readFileSync(`/home/ubuntu/content_extracted/${matchingFile}`, 'utf8');
          } else {
            console.log(`Could not find content file for session ${session_id}`);
            contentText = `Session ${session_id} content - see original at ${original_url}`;
          }
        }
      }
    } catch (err) {
      console.log(`Error reading content for session ${session_id}: ${err.message}`);
      contentText = `Session ${session_id} content - see original at ${original_url}`;
    }
    
    try {
      // Insert or update the session
      await connection.execute(
        `INSERT INTO ra_sessions (sessionNumber, title, sessionDate, content, originalUrl, archivedAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())
         ON DUPLICATE KEY UPDATE
         title = VALUES(title),
         sessionDate = VALUES(sessionDate),
         content = VALUES(content),
         originalUrl = VALUES(originalUrl),
         updatedAt = NOW()`,
        [sessionNumber, title, session_date || null, contentText, original_url]
      );
      
      imported++;
      console.log(`Imported session ${session_id} (${title})`);
    } catch (err) {
      console.log(`Error importing session ${session_id}: ${err.message}`);
      errors++;
    }
  }
  
  console.log(`\nImport complete!`);
  console.log(`Successfully imported: ${imported}`);
  console.log(`Errors: ${errors}`);
  
  await connection.end();
}

importSessions().catch(console.error);
