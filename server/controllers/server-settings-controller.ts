import { ServerSettings } from '../models/server-settings';
import * as fs from 'fs';
import * as path from 'path';

export class ServerSettingsController {
  constructor() { }
  public static getServerConfig(): ServerSettings {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../models/server-settings.json'), 'utf-8'));
  }
}
