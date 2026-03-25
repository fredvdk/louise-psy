'use server'

export async function deleteReservatie(formData: FormData){
    const reservatieId = formData.get('reservatieId');
    console.log("Deleting : ",reservatieId);
}

export async function confirmReservatie(formData: FormData){
    const reservatieId = formData.get("reservatieId");
    console.log("Confirming :", reservatieId)
}