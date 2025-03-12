import os
import shutil
import sys

def copy_directory(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest, ignore=shutil.ignore_patterns('copyto.txt'))

def process_directory(root_dir):
    for dirpath, _, filenames in os.walk(root_dir):
        if 'copyto.txt' in filenames:
            with open(os.path.join(dirpath, 'copyto.txt')) as f:
                target_dirs = [line.strip() for line in f]

            for target_dir in target_dirs:
                shared_subdir = os.path.join(target_dir, dirpath)
                os.makedirs(shared_subdir, exist_ok=True)
                copy_directory(dirpath, shared_subdir)

                with open(os.path.join(os.path.join(target_dir, root_dir), 'NOEDIT.txt'), 'w') as f:
                    f.write("The contents of this directory have been copied and shouldn't be edited.")

if __name__ == "__main__":
    if len(sys.argv) != 2 or not os.path.isdir(sys.argv[1]):
        sys.exit("Usage: python3 script.py <valid_directory>")
    
    process_directory(sys.argv[1])
    print("Operation completed.")