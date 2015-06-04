import os
import base64,json

curPath= os.path.dirname(os.path.realpath(__file__))
midiFiles = {}
for root,folders,files in os.walk(curPath):
	for mf in files:
		if os.path.splitext(mf)[1] == ".mid":
			midiFiles[os.path.splitext(mf)[0]] = {}
			cpath = os.path.join(root,mf)
			cpath64 = cpath+".b64"
			infile = open(cpath,"rb")
			outfile = open(cpath64,"w")
			base64.encode(infile,outfile)
			infile.close();
			outfile.close();
			with open(cpath64, "r") as f:
				myBuf = ""
				byte = f.read(1)
				while byte != "":
					if byte!= "\n":
						myBuf+=byte;
					byte = f.read(1)
				f.close()
			os.remove(cpath64)
			midiFiles[os.path.splitext(mf)[0]]["data"] = myBuf
			midiFiles[os.path.splitext(mf)[0]]["bpm"] = 120

with open(os.path.join(curPath,"MidiFiles.js"),"w") as f:
	f.write("var midiFiles = "+json.dumps(midiFiles,indent=4));