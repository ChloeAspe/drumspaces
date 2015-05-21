#!/usr/bin/env python


import os
import json

rootFolder = "/Users/Tintamar/Dev/drumspaces/samples/mp3"
outFolder = "/Users/Tintamar/Dev/drumspaces/JSON"


def baseinfo(name):
	# if name.split(' ')[0] in destClass:
	return " ".join(name.split(' ')[1:])
	# else:
	# 	return name
	
destClass = ["ClosedHH","OpenHH","Kick","Snare"]
sortedDic = {}
for root ,folders,_files in os.walk(rootFolder):
	curFolder = root[len(os.path.commonprefix([rootFolder,root]))+1:]
	files = [baseinfo(x) for x in _files if (os.path.splitext(x)[1] == ".mp3")]
	files.sort()
	
	if curFolder != "tst" and len(files)!=0:
		sortedDic[curFolder] = {}
		for f in files:
			for o in _files:
				if baseinfo(o)== f:
					oriName = o;
					break;
			letter = f[0].lower()
			if not letter in sortedDic[curFolder].iterkeys():
				sortedDic[curFolder][letter] = []
			sortedDic[curFolder][letter] += [os.path.splitext(oriName)[0]+".wav"];

outPos = {}
for k,v in sortedDic.iteritems():
	outPos[k] = {}
	totalSize = len(v)+1;
	totalIdx = 1;
	for kk,vv in v.iteritems():

		size = len(vv)+1
		i=1

		for name in vv:
				outPos[k][name] = [i*1.0/size - 0.5,totalIdx*1.0/totalSize - 0.5];
				i+=1
		totalIdx+=1;

	with open(os.path.join(outFolder,"Alphabetic_Positions_"+k+".js"),'w') as f:
		jData = json.dumps(outPos[k],indent=4)
		jData = "var Alphabetic_"+k+"Pos =\n"+jData;
		f.write(jData)



print outPos



