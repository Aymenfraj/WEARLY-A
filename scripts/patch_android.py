# Adapte le projet Android genere par Capacitor : permissions, icone, signature, version.
import os, re, shutil, glob
base = 'android/app/src/main'
# 1) permissions
mf = base + '/AndroidManifest.xml'; m = open(mf, encoding='utf-8').read()
perms = ['ACCESS_NETWORK_STATE','ACCESS_COARSE_LOCATION','ACCESS_FINE_LOCATION','RECORD_AUDIO','MODIFY_AUDIO_SETTINGS','CAMERA','POST_NOTIFICATIONS','VIBRATE','READ_MEDIA_IMAGES','READ_MEDIA_VIDEO']
add = ''.join('    <uses-permission android:name="android.permission.%s"/>\n' % p for p in perms if 'permission.%s"' % p not in m)
add += '    <uses-feature android:name="android.hardware.camera" android:required="false"/>\n    <uses-feature android:name="android.hardware.microphone" android:required="false"/>\n    <uses-feature android:name="android.hardware.location.gps" android:required="false"/>\n'
open(mf, 'w', encoding='utf-8').write(m.replace('<application', add + '    <application', 1))
# 2) icone definitive (adaptive : fond uni + W dore) et nom
try:
    for k in ('mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'):
        dst = base + '/res/mipmap-' + k; os.makedirs(dst, exist_ok=True)
        for f in glob.glob('resources/android/mipmap-%s/*.png' % k): shutil.copy(f, dst)
    os.makedirs(base + '/res/values', exist_ok=True)
    open(base + '/res/values/ic_launcher_background.xml', 'w').write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#0A2A1C</color>\n</resources>\n')
except Exception as e:
    print('icone ignoree:', e)
# 3) build.gradle : lint, version, signature
gp = 'android/app/build.gradle'; g = open(gp, encoding='utf-8').read()
g = re.sub(r'android\s*\{', 'android {\n    lint { checkReleaseBuilds false; abortOnError false }', g, 1)
run = os.environ.get('RUN_NUMBER', '1')
g = re.sub(r'versionCode\s+\d+', 'versionCode ' + run, g, 1)
g = re.sub(r'versionName\s+"[^"]*"', 'versionName "2.0.' + run + '"', g, 1)
if os.environ.get('KS_PASS'):
    g = re.sub(r'(buildTypes\s*\{\s*release\s*\{)', r'\1\n            signingConfig signingConfigs.release', g, 1)
    sc = '''    signingConfigs {
        release {
            storeFile file("release.jks")
            storePassword System.getenv("KS_PASS")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEY_PASS")
        }
    }
'''
    g = g.replace('    buildTypes {', sc + '    buildTypes {', 1)
open(gp, 'w', encoding='utf-8').write(g)
print('projet Android adapte (version %s, signature %s)' % (run, 'oui' if os.environ.get('KS_PASS') else 'non'))
