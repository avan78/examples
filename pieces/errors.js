useLayoutEffect(() => {
  if (globalError?.message) {
    if (globalError.message.toLowerCase().includes("network error")) {
      if (location.pathname !== "/network-error") {
        window.location.replace("/network-error");
      }
      return;
    }
    if (globalError.message.includes("5")) {
      toast.error(
        `Potíže na straně serveru: chyba ${globalError.message.slice(-3)}`
      );
      return;
    }
    if (globalError.message.includes("4")) {
      toast.error(
        `Potíže na straně klienta: chyba ${globalError.message.slice(-3)}`
      );
      return;
    }
    // canceled = canceled response caused by useEffect cleanup
    if (globalError.message !== "canceled") {
      toast.error(`${globalError.message}`);
    }
  }
}, [globalError]);
