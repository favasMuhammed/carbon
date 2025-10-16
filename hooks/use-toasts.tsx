type ToastProps = {
    title?: string
    description?: string
    variant?: "default" | "destructive"
  }
  
  export function toast({ title, description, variant = "default" }: ToastProps) {
    // In a real implementation, this would manage a toast queue
    // For simplicity, we're just logging to console
    console.log(`Toast: ${title} - ${description}`)
  
    // You could implement a custom toast UI here
    const toastElement = document.createElement("div")
    toastElement.className = `fixed top-4 right-4 p-4 rounded-md shadow-md ${
      variant === "destructive" ? "bg-red-500" : "bg-green-500"
    } text-white max-w-xs z-50`
  
    const titleElement = document.createElement("h3")
    titleElement.className = "font-medium"
    titleElement.textContent = title || ""
  
    const descElement = document.createElement("p")
    descElement.className = "text-sm"
    descElement.textContent = description || ""
  
    toastElement.appendChild(titleElement)
    toastElement.appendChild(descElement)
    document.body.appendChild(toastElement)
  
    setTimeout(() => {
      toastElement.remove()
    }, 3000)
  }
  