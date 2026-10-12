package main

import (
	"errors"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

// ProjectInfo describes the App Builder project whose support data will be uploaded.
type ProjectInfo struct {
	Name string `json:"name"`
	// Folder is the absolute path of the project folder.
	Folder string `json:"folder"`
	// LastModified is the modification time of <name>.appDef, in Unix milliseconds.
	LastModified int64 `json:"lastModified"`
	// FolderSize is the total size in bytes of all the files in Folder.
	FolderSize int64 `json:"folderSize"`
}

// ProjectService gives the frontend information about the project being uploaded.
type ProjectService struct {
	// folder is the project folder passed on the command line, if any.
	folder string
}

// GetStartupFolder returns the project folder passed on the command line,
// or an empty string if none was given.
func (p *ProjectService) GetStartupFolder() string {
	return p.folder
}

// GetProjectInfo finds the .appDef file in folder and returns details of the project.
func (p *ProjectService) GetProjectInfo(folder string) (ProjectInfo, error) {
	folder, err := filepath.Abs(folder)
	if err != nil {
		return ProjectInfo{}, err
	}

	appDefs, err := filepath.Glob(filepath.Join(folder, "*.appDef"))
	if err != nil {
		return ProjectInfo{}, err
	}
	if len(appDefs) == 0 {
		return ProjectInfo{}, errors.New("no .appDef file found in " + folder)
	}

	appDef, err := os.Stat(appDefs[0])
	if err != nil {
		return ProjectInfo{}, err
	}

	var size int64
	err = filepath.WalkDir(folder, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.Type().IsRegular() {
			info, err := d.Info()
			if err != nil {
				return err
			}
			size += info.Size()
		}
		return nil
	})
	if err != nil {
		return ProjectInfo{}, err
	}

	return ProjectInfo{
		Name:         strings.TrimSuffix(appDef.Name(), filepath.Ext(appDef.Name())),
		Folder:       folder,
		LastModified: appDef.ModTime().UnixMilli(),
		FolderSize:   size,
	}, nil
}
