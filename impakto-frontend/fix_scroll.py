import os
import re

directory = '/home/claudio/projects/NOVAMINDS/IMPAKTO/impakto-frontend/apps/msme-PWA/src/components/screens'
for filename in os.listdir(directory):
    if filename.endswith(".tsx") or filename.endswith(".js"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r') as f:
            content = f.read()
            
        # Regex to find className="..." that contains "flex-1" but not "overflow-y-auto"
        # We will basically find all flex-1 and if they don't have overflow-y-auto, we append it.
        # Actually, let's just do a specific replacement.
        
        # We look for className="... flex-1 ..." or similar.
        def replacer(match):
            cls_str = match.group(1)
            if 'flex-1' in cls_str and 'overflow-y-auto' not in cls_str:
                return 'className="' + cls_str + ' overflow-y-auto"'
            else:
                return match.group(0)
                
        new_content = re.sub(r'className="([^"]*flex-1[^"]*)"', replacer, content)
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated {filename}")

print("Done")
