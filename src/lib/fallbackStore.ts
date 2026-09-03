import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const fallbackFilePath = path.join(dataDir, 'applications_fallback.json');

export function saveFallbackApplication(applicationData: any) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let existingData: any[] = [];
    if (fs.existsSync(fallbackFilePath)) {
      try {
        const fileContent = fs.readFileSync(fallbackFilePath, 'utf-8');
        existingData = JSON.parse(fileContent);
      } catch {
        existingData = [];
      }
    }

    const record = {
      ...applicationData,
      savedAt: new Date().toISOString(),
      mode: 'fallback_disk_storage',
    };

    existingData.push(record);
    fs.writeFileSync(fallbackFilePath, JSON.stringify(existingData, null, 2), 'utf-8');
    console.log(`[Fallback Store] Successfully saved application to data/applications_fallback.json`);
  } catch (err) {
    console.error('[Fallback Store] Error saving fallback application to disk:', err);
  }
}
