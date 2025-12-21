export async function getBiomeForFloor(floor) {
    const res=await fetch("http://localhost:3001/api/generate-biome",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({floor})
    });

    return await res.json();
    
}