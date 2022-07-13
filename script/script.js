const rpmL = 500;
const rpmC = 1200;
let a, b, c, d, e, u1, u2, u3, u4, u5, u6, z1, z2, z3, z4, z5, z6;

function fuzzy() {
    let pk = document.getElementById("pakaian").value;
    let kt = document.getElementById("kotor").value;

    if (pk < 0 || pk > 100) {
        document.getElementById("hasil").innerHTML = "Harap input pakaian 0 - 100";
        return;
    } else if (kt < 0 || kt > 100) {
        document.getElementById("hasil").innerHTML = "Harap input tingkat kekotoran 0 - 100";
        return;
    } else {
        fuzzifikasi(pk,kt);
        inferensi();
        // defuzzifikasi
        let z = ((u1 * z1) + (u2 * z2) + (u3 * z3) + (u4 * z4) + (u5 * z5) + (u6 * z6)) / ((u1 + u2 + u3 + u4 + u5 + u6))
        document.getElementById("hasil").innerHTML = z.toFixed(2);
    }
    
    
    
}

function fuzzifikasi(pk, kt) {
    // Pakaian Sedikit
    if (pk <= 40) {
        a = 1;
    } else if (pk >= 40 && pk <= 80) {
        a = (80 - pk) / (80 - 40);
    } else if (pk >= 80) {
        a = 0;
    }
    
    // Pakaian Banyak
    if (pk <= 40) {
        b = 0;
    } else if (pk >= 40 && pk <= 80) {
        b = (pk - 40) / (80 - 40);
    } else if (pk >= 80) {
        b = 1;
    }

    // Kotor Rendah
    if (kt <= 40) {
        c = 1;
    } else if (kt >= 40 && kt <= 50) {
        c = (50 - kt) / (50 - 40);
    } else if (kt >= 50) {
        c = 0;
    }

    // Kotor Sedang
    if (kt <= 40 || kt >= 60) {
        d = 0;
    } else if (kt >= 40 && kt <= 50) {
        d = (kt - 40) / (50 - 40);
    } else if (kt >= 50 && kt <= 60) {
        d = (60 - kt) / (60 - 50);
    }

    // Kotor Tinggi
    if (kt <= 50) {
        e = 0;
    } else if (kt >= 50 && kt <= 60) {
        e = (kt - 50) / (60 - 50);
    } else if (kt >= 60) {
        e = 1;
    }
}

function inferensi() {
    // R1 pakaian sedikit dan kotoran rendah, putaran lambat
    u1 = Math.min(a,c);
    z1 = rpmC - (u1 * (rpmC - rpmL));
    
    // R2 pakaian sedikit dan kotoran sedang, putaran lambat
    u2 = Math.min(a, d);
    z2 = rpmC - (u2 * (rpmC - rpmL));

    
    // R3 pakaian sedikit dan kotoran tinggi, putaran cepat
    u3 = Math.min(a, e);
    z3 = rpmL + (u3 * (rpmC - rpmL));

    
    // R4 pakaian banyak dan kotoran rendah, putaran lambat
    u4 = Math.min(b, c);
    z4 = rpmC - (u4 * (rpmC - rpmL));

    
    // R5 pakaian banyak dan kotoran sedang, putaran cepat
    u5 = Math.min(b, d);
    z5 = rpmL + (u5 * (rpmC - rpmL));

    
    // R6 pakaian banyak dan kotoran sedang, putaran cepat
    u6 = Math.min(b, e);
    z6 = rpmL + (u6 * (rpmC - rpmL));

}