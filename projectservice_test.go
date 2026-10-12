package main

import (
	"os"
	"path/filepath"
	"testing"
	"time"
)

func TestGetProjectInfo(t *testing.T) {
	folder := t.TempDir()
	appDef := filepath.Join(folder, "WEB_Gospels.appDef")
	if err := os.WriteFile(appDef, []byte("<app-definition/>"), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := os.MkdirAll(filepath.Join(folder, "data"), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(folder, "data", "book.usfm"), make([]byte, 1000), 0o644); err != nil {
		t.Fatal(err)
	}
	modified := time.Date(2026, 10, 2, 9, 20, 21, 0, time.UTC)
	if err := os.Chtimes(appDef, modified, modified); err != nil {
		t.Fatal(err)
	}

	info, err := (&ProjectService{}).GetProjectInfo(folder)
	if err != nil {
		t.Fatal(err)
	}

	if info.Name != "WEB_Gospels" {
		t.Errorf("Name = %q, want %q", info.Name, "WEB_Gospels")
	}
	if info.LastModified != modified.UnixMilli() {
		t.Errorf("LastModified = %d, want %d", info.LastModified, modified.UnixMilli())
	}
	if want := int64(len("<app-definition/>") + 1000); info.FolderSize != want {
		t.Errorf("FolderSize = %d, want %d", info.FolderSize, want)
	}
}

func TestGetProjectInfoNoAppDef(t *testing.T) {
	if _, err := (&ProjectService{}).GetProjectInfo(t.TempDir()); err == nil {
		t.Error("expected an error for a folder without a .appDef file")
	}
}
