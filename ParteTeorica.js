// 1. Que problemas detectas en la operación y razona la respuesta.

// Como podemos observar nos encontramos los siguientes problemas en la operación que estamos usando para getTotal:

//     1. Acoplamiento con los detalles internos de las clases.

//         1.1. El cálculo del precio depende directamente de los atributos específicos de la clase MultimediaContent (por ejemplo, streamingPrice, downloadPrice y additionalFee). Esto significa que, si en el futuro se modifica la estructura de esta clase (como cambiar cómo se calculan o almacenan los precios), será necesario modificar el código de getTotal.

//         1.2. Este diseño viola el principio de abstracción y genera un acoplamiento innecesario entre RegisteredUser y los detalles internos de cómo las tarifas están representadas.

//     2. Violación del Principio de Abierto/Cerrado.

//         2.1. El método getTotal no es extensible sin modificar el código existente. Si se añaden nuevos tipos de servicios (por ejemplo, servicio de alquiler), o se incluyen nuevas reglas de cálculo (como impuestos o descuentos), será necesario modificar directamente este método.

//         2.2. Idealmente, el cálculo del precio debería ser extensible a través de la adición de nuevas clases o métodos, y no mediante cambios al código existente.

//     3. Errores en el cálculo del total para contenidos premium.

//         3.1. En su estado actual, el código no suma correctamente el precio base del contenido para contenidos premium. Solo suma el valor de additionalFee, ignorando la tarifa base (ya sea en formato de streaming o de download). Esto genera resultados incorrectos para los usuarios que consumen contenido premium.

// 2. Propón una solución alternativa que corrija los problemas de la operación getTotal de RegisteredUser que has detectado en la pregunta anterior.

// Link para ver el funcionamiento: https://codepen.io/franaragon/pen/YPKPepj?editors=1112

// Clase base para calcular precios de contenidos multimedia
class MultimediaContent {
  constructor(isPremium, streamingPrice, downloadPrice, additionalFee) {
    this.isPremium = isPremium;
    this.streamingPrice = streamingPrice;
    this.downloadPrice = downloadPrice;
    this.additionalFee = additionalFee;
  }

  calculatePrice(serviceType) {
    let basePrice = 0;

    switch (serviceType) {
      case "streaming":
        basePrice = this.streamingPrice;
        break;
      case "download":
        basePrice = this.downloadPrice;
        break;
      // Si agregamos más tipos de servicios, solo es necesario añadir más casos.
      default:
        throw new Error("Tipo de servicio desconocido...");
    }

    if (this.isPremium) {
      basePrice += this.additionalFee; // Si el contenido es premium, se calcula de forma correcta la tasa adicional
    }

    return basePrice;
  }
}

// Clase de servicio (representa un contenido específico y el tipo de uso)
class Service {
  constructor(content, serviceType) {
    this.content = content; // Contenido multimedia
    this.serviceType = serviceType; // Tipo de servicio: "streaming" o "download"
  }

  calculatePrice() {
    return this.content.calculatePrice(this.serviceType);
  }
}

// Clase de usuario registrado
class RegisteredUser {
  constructor(services = []) {
    this.services = services; // Lista de servicios solicitados por el usuario
  }

  getTotal() {
    // Usamos un reduce para recorrer la lista de servicios y sumamos el precio calculado para cada uno. Ahora en la clase del usuario registrado, getTotal tan solo se dedica a sumar todos los precios
    // evitando asi calculos innecesarios en esta clase
    return this.services.reduce(
      (total, service) => total + service.calculatePrice(),
      0
    );
  }
}

// Ejemplo de uso
const contentPremium = new MultimediaContent(true, 100, 50, 20); // Contenido premium con tarifa adicional
const contentStandard = new MultimediaContent(false, 80, 40, 0); // Contenido estándar

const streamingService = new Service(contentPremium, "streaming");
const downloadService = new Service(contentStandard, "download");

// Imaginemos que el usuario ha consumido dos servicios, uno de streaming (y además premium) y otro de descarga
const user = new RegisteredUser([streamingService, downloadService]);

console.log(`Precio total: ${user.getTotal()}€`); // Salida esperada: 100 (premium streaming) + 20 (tasa adicional contenido premium) + 40 (standard download) = 160
