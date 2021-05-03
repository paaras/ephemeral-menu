import plotly.express as px
import plotly.graph_objects as go
import numpy as np
import sys
import os
import csv
import scipy.stats

gstat = []
gephe = []
gweph = []

gserr = 0
geerr = 0
gewer = 0

for filename in sorted(os.listdir(sys.argv[1]+"/")):
    if filename[0] == ".":
        continue

    print(filename)

    serror = 0
    eerror = 0
    weerror = 0

    time = [0,0,0]
    stime = []
    etime = []
    ewtime = []

    file = open(sys.argv[1]+"/"+filename, 'r')
    for line in file:
        ans = line.split()
        if len(ans) == 0:
            continue
        else:
            #print(line.split())
            if ans[0] == 'static':
                if ans[-2] == 'false':
                    serror += 1
                    gserr += 1
                time[0] += int(ans[-1])
                stime.append(int(ans[-1]))
                gstat.append(int(ans[-1]))
                #print(stime)
            if ans[0] == 'ephemeral':
                if ans[-2] == 'false':
                    eerror += 1
                    geerr += 1
                time[1] += int(ans[-1])
                etime.append(int(ans[-1]))
                gephe.append(int(ans[-1]))
            if ans[0] == 'ephemeralw':
                if ans[-2] == 'false':
                    weerror += 1
                    gewer += 1
                time[2] += int(ans[-1])
                ewtime.append(int(ans[-1]))
                gweph.append(int(ans[-1]))
    file.close()

    print("error (stat, ephem, wephem):",serror,eerror,weerror)
    print("average time (s, e, ew):",time[0]/len(stime),time[1]/len(etime),time[2]/len(ewtime))

    fig = go.Figure() 
    fig.add_trace(go.Scatter(x=np.arange(len(stime)), y=stime, name='static'))
    fig.add_trace(go.Scatter(x=np.arange(len(etime)), y=etime, name='ephemeral'))
    fig.add_trace(go.Scatter(x=np.arange(len(ewtime)), y=ewtime, name='wephemeral'))
    fig.write_image("/Users/Paaras/Downloads/ephe/charts/"+filename+".png")
    print()

degfree = len(gstat) - 1

means = sum(gstat)/len(gstat)
std_error = scipy.stats.sem(gstat)
interval_stat = scipy.stats.t.interval(.95, degfree, means, std_error)
print(interval_stat)

meane = sum(gephe)/len(gephe)
std_error = scipy.stats.sem(gephe)
interval_ephe = scipy.stats.t.interval(.95, degfree, meane, std_error)
print(interval_ephe)

meanw = sum(gweph)/len(gweph)
std_error = scipy.stats.sem(gweph)
interval_weph = scipy.stats.t.interval(.95, degfree, meanw, std_error)
print(interval_weph)

print("\nStatic:", means)
print("Ephemeral:", meane)
print("Wephemeral:", meanw)

fig = px.bar(x=["Static","Ephemeral w/ High Accuracy","Ephemeral w/Low Accuracy"], y=[means,meane,meanw], error_y=[interval_stat[1]-interval_stat[0],interval_ephe[1]-interval_ephe[0],interval_weph[1]-interval_weph[0]])
fig.update_layout(title = "Average Selection Time Between Experiments", xaxis_title="Experiment", yaxis_title="Time (milliseconds)")

fig.write_image("/Users/Paaras/Downloads/ephe/"+"global"+".png")

print("\nStatic Error:", gserr)
print("Ephemeral Error:", geerr)
print("Wephemeral Error:", gewer)

fig2 = px.bar(x=["Static","Ephemeral w/ High Accuracy","Ephemeral w/Low Accuracy"], y=[gserr,geerr,gewer])
fig2.update_layout(title = "Number of Wrong Selections in Each Experiment", xaxis_title="Experiment", yaxis_title="Number of Wrong Selections")

fig2.write_image("/Users/Paaras/Downloads/ephe/"+"err"+".png")