import { STATUS_CODES } from 'http'
import fetch from 'node-fetch'

let processes = {}

function addProcess(pid,url) {
    processes[pid] = {pid,url,status:0}
}
addProcess('blocklive','https://blocklive.atticat.tech/')

function checkAll() {
    Object.keys(processes).forEach(pid=>check(pid))
}
checkAll()
setInterval(checkAll,1000 * 60) // check every minute! 

async function check(processId) {
    let status;
    let process = processes[processId]
    try { 
        let response = await fetch(process.url)
        status = response.status 
    }
    catch(e) { status = e.message }
    
    if(process.status != status) {
        process.status = status;
    }
}
check('blocklive')

function getStatusText(status) {
    return STATUS_CODES[status] ? status + ': ' + STATUS_CODES[status] : status;
}