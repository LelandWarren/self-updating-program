-- init.sql

-- Create the versions table if it doesn't exist
CREATE TABLE IF NOT EXISTS versions (
    id UUID PRIMARY KEY,
    version VARCHAR(20) NOT NULL,
    release_notes TEXT,
    release_date TIMESTAMP WITH TIME ZONE,
    required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the version_files table if it doesn't exist
CREATE TABLE IF NOT EXISTS version_files (
    id UUID PRIMARY KEY,
    os VARCHAR(20) NOT NULL,
    download_url TEXT NOT NULL,
    checksum VARCHAR(64),
    version_id UUID REFERENCES versions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default version data if not exists
INSERT INTO versions (id, version, release_notes, release_date, required)
SELECT '123e4567-e89b-12d3-a456-426614174000', '1.0.0', 'Initial release', NOW(), FALSE
WHERE NOT EXISTS (SELECT 1 FROM versions WHERE id = '123e4567-e89b-12d3-a456-426614174000');

-- Insert default version data if not exists
INSERT INTO versions (id, version, release_notes, release_date, required)
SELECT '123e4567-e89b-12d3-a456-426614174004', '1.0.1', 'Patch release (windows)', NOW(), FALSE
WHERE NOT EXISTS (SELECT 1 FROM versions WHERE id = '123e4567-e89b-12d3-a456-426614174004');

-- Insert default version file data if not exists
INSERT INTO version_files (id, os, download_url, checksum, version_id)
SELECT '123e4567-e89b-12d3-a456-426614174001', 'windows', 'https://example.com/windows_installer.exe', 'abc1234def5678...', '123e4567-e89b-12d3-a456-426614174000'
WHERE NOT EXISTS (SELECT 1 FROM version_files WHERE id = '123e4567-e89b-12d3-a456-426614174001');

-- Insert default version file data if not exists
INSERT INTO version_files (id, os, download_url, checksum, version_id)
SELECT '123e4567-e89b-12d3-a456-426614174002', 'mac', 'https://example.com/mac_installer.exe', 'abc1234def5678...', '123e4567-e89b-12d3-a456-426614174000'
WHERE NOT EXISTS (SELECT 1 FROM version_files WHERE id = '123e4567-e89b-12d3-a456-426614174002');


-- Insert default version file data if not exists
INSERT INTO version_files (id, os, download_url, checksum, version_id)
SELECT '123e4567-e89b-12d3-a456-426614174005', 'windows', 'https://example.com/windows_installer.exe', 'abc1234def5678...', '123e4567-e89b-12d3-a456-426614174004'
WHERE NOT EXISTS (SELECT 1 FROM version_files WHERE id = '123e4567-e89b-12d3-a456-426614174005');