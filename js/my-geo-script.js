document.addEventListener('DOMContentLoaded', function() {
    if (typeof geoData === 'undefined' || !geoData.countryIsoCode) {
        console.error('geoData is not defined or does not have countryIsoCode property');
        return;
    }

    var countryIsoCode = geoData.countryIsoCode;
    console.log("ISO Code:", countryIsoCode);

    var allowedCountries = {
        "Africa": ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "DJ", "EG", "GQ", "ER", "SZ", "ET", "GA", "GM", "GH", "GN", "GW", "CI", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG", "TN", "UG", "ZM", "ZW"],
        "Asia": ["AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", "CN", "CY", "GE", "IN", "ID", "IR", "IQ", "IL", "JP", "JO", "KZ", "KP", "KR", "KW", "KG", "LA", "LB", "MY", "MV", "MN", "MM", "NP", "OM", "PK", "PS", "PH", "QA", "SA", "SG", "LK", "SY", "TJ", "TH", "TL", "TR", "TM", "AE", "UZ", "VN", "YE"],
        "Europe": ["AL", "AD", "AM", "AT", "AZ", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "GE", "DE", "GR", "HU", "IS", "IE", "IT", "KZ", "XK", "LV", "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SE", "CH", "TR", "UA", "GB", "VA"],
        "America": ["AG", "BS", "BB", "BZ", "CA", "CR", "CU", "DM", "DO", "SV", "GD", "GT", "HT", "HN", "JM", "MX", "NI", "PA", "KN", "LC", "VC", "TT", "US", "AR", "BO", "BR", "CL", "CO", "EC", "GY", "PY", "PE", "SR", "UY", "VE"],
        "Oceania": ["AU", "FJ", "KI", "MH", "FM", "NR", "NZ", "PW", "PG", "WS", "SB", "TO", "TV", "VU"]
    };


    var continent = null;

    for (var key in allowedCountries) {
        if (allowedCountries[key].includes(countryIsoCode)) {
            continent = key;
            break;
        }
    }

    console.log("Determined Continent:", continent);

    if (continent) {
        document.querySelectorAll('.continent-block').forEach(function(block) {
            var blockContinents = block.getAttribute('data-continent');
            console.log("Block Continents:", blockContinents);

            if (blockContinents) {
                var continentsArray = blockContinents.split(' ');

                if (!continentsArray.includes(continent)) {
                    console.log("Hiding block. It does not include continent:", continent);
                    block.style.display = 'none';
                } else {
                    console.log("Showing block. It includes continent:", continent);
                }
            }
        });
    }
});