#!/usr/bin/env python


import os
import json
from collections import OrderedDict

rootFolder = "/../../samples/wav"
rootFolder = os.path.realpath(__file__+rootFolder)
outFolder = "/../../JSON"
outFolder = os.path.realpath(__file__+outFolder)

print rootFolder
def baseinfo(name):
	# if name.split(' ')[0] in destClass:
	res = " ".join(name.split(' ')[1:])
	if(res==""):
		print("error" + name);
	return res;
	# return name
	# else:
	# 	return name

destClass = ["ClosedHH","OpenHH","Kick","Snare"]
sortedDic = {}
for root ,folders,_files in os.walk(rootFolder):
	curFolder = root[len(os.path.commonprefix([rootFolder,root]))+1:]
	files = [baseinfo(x) for x in _files if (os.path.splitext(x)[1] == ".wav")]
	files.sort()
	
	if curFolder != "tst" and curFolder!="Default" and len(files)!=0:
		sortedDic[curFolder] = OrderedDict()
		for f in files:
			
			for o in _files:
				if baseinfo(o)== f:
					oriName = o;
					break;
			letter = f[0].lower()
			if not letter in sortedDic[curFolder].iterkeys():
				sortedDic[curFolder][letter] = []
				print letter
			else :
				print "_"+letter
			sortedDic[curFolder][letter] += [os.path.splitext(oriName)[0]+".wav"];

outPos = {}
for k,v in sortedDic.iteritems():
	outPos[k] = {}
	totalSize = len(v)+2;
	totalIdx = 1;
	for kk,vv in v.iteritems():
		print kk;
		size = len(vv)+1
		i=1
		wasChanging = False;
		for name in vv:
			if(kk=='s'):
				if(i<size/2) :
					outPos[k][name] = [i*2.0/(size) - 0.5,totalIdx *1.0/totalSize - 0.5];
				else:
					if not wasChanging :
						totalIdx+=1
						wasChanging = True;
					outPos[k][name] = [(i-size/2)*2.0/(size) - 0.5,(totalIdx)*1.0/totalSize - 0.5];
				i+=1
			else:
				outPos[k][name] = [i*1.0/size - 0.5,totalIdx *1.0/totalSize - 0.5];
				i+=1
		totalIdx+=1;


	with open(os.path.join(outFolder,"Alphabetic_Positions_"+k+".js"),'w') as f:
		jData = json.dumps(outPos[k],indent=4)
		jData = "var Alphabetic_"+k+"Pos =\n"+jData;
		f.write(jData)



print outPos



