"use client";
import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, FileUp, Check, X, AlertCircle } from "lucide-react";




function HeroInput() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Accepted file formats
  const acceptedFormats = [
    ".sat",
    ".step",
    ".stp",
    ".sldprt",
    ".stl",
    ".catpart",
    ".ipt",
    ".3dxml",
    ".ptc",
    ".prt",
    ".dwg",
    ".pdf",
  ];

  // Validate file extensions
  const validateFiles = (filesToValidate: File[]): File[] => {
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    filesToValidate.forEach((file) => {
      const extension = "." + file.name.split(".").pop()?.toLowerCase();
      if (acceptedFormats.includes(extension)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      setErrorMessage(
        `Invalid file format: ${invalidFiles.join(
          ", "
        )}. Please upload only supported formats.`
      );
      setTimeout(() => setErrorMessage(null), 5000); // Clear error after 5 seconds
    }

    return validFiles;
  };

  // Handle drag events
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const validNewFiles = validateFiles(newFiles);
      if (validNewFiles.length > 0) {
        setFiles((prev) => [...prev, ...validNewFiles]);
      }
    }
  };

  // Handle file input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const validNewFiles = validateFiles(newFiles);
      if (validNewFiles.length > 0) {
        setFiles((prev) => [...prev, ...validNewFiles]);
      }
    }
  };

  // Handle button click to open file dialog
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  // Remove a file from the list
  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Submit the files
  const handleSubmit = () => {
    if (files.length === 0) return;

    // Here you would typically send files to your backend
    console.log("Submitting files:", files);

    // Example FormData preparation
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    // Reset files after submission
    // setFiles([]);

    // Your API call would go here
    // api.uploadFiles(formData).then(...).catch(...);
  };

  return (
    <div className="w-full  bg-primary px-4 sm:px-6 md:px-12 lg:px-24 xl:px-36 py-8 md:py-10 lg:py-14 flex flex-col justify-center items-start gap-10 md:gap-16 lg:gap-20">
      <div className="w-full flex flex-col lg:flex-row justify-start items-center gap-8 md:gap-10 lg:gap-12">
        {/* Left content section */}
        <div className="w-full lg:flex-1 flex flex-col justify-start items-start gap-6 md:gap-8 lg:gap-10">
          <div className="w-full flex flex-col justify-start items-start gap-3 md:gap-4">
            <div className="inline-flex justify-start items-center gap-2.5">
              <div className="h-6 px-2.5 bg-lime-50 rounded-full flex justify-start items-center gap-2">
                <div className="justify-start text-sky-600 text-xs font-medium font-['Inter'] leading-tight">
                  Forging
                </div>
              </div>
            </div>
            <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold font-['Inter'] leading-tight lg:leading-[81.60px]">
              Die Casting
            </div>
            <div className="w-full text-white text-base md:text-lg font-normal font-['Inter'] leading-relaxed">
              <span className="text-white font-bold">
                Precision Manufacturing:
              </span>{" "}
              Our die casting process ensures high precision and intricate
              detail, meeting the exact specifications required for functional
              components.
              <br />
              <span className="text-white font-bold">
                Material Versatility:{" "}
              </span>
              We work with a range of metal alloys to provide customized
              solutions tailored to your specific application.
              <br />
              <span className="text-white font-bold">
                Surface Finishing:
              </span>{" "}
              After die casting, components can undergo further refinement
              through processes like CNC machining, shot-blasting, texturing,
              plating, and painting to achieve the desired surface finish.
            </div>
          </div>
        </div>

        {/* Right form section */}
        <div className="w-full max-w-3xl lg:w-1/2  mx-auto px-4 sm:px-6 md:px-8">
          <div
            className={`p-4 sm:p-6 md:p-8 rounded-[20px] border flex flex-col items-center justify-center gap-6 transition-all ${
              dragActive ? "border-sky-400 border-2" : "border-white"
            }`}
            style={{
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #046BD2",
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {/* Error message display */}
            {errorMessage && (
              <div className="w-full bg-red-500/20 border border-red-500 text-white p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <div className="w-full sm:w-auto flex flex-col items-center text-center gap-3 sm:gap-4 md:gap-6 py-8 md:py-10">
              {files.length === 0 ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                      Submit Your Drawing
                    </h2>
                    <p className="text-sm sm:text-base text-white/70">
                      SAT | STEP | STP | SLDPRT | STL | CATPART | IPT | 3DXML |
                      PTC | PRT | DWG | PDF
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <p>Drag & drop your files here, or</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-4 w-full">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
                      Selected Files
                    </h2>
                    <div className="w-full space-y-2 max-h-52 overflow-y-auto p-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white/10 p-2 rounded"
                        >
                          <div className="flex items-center gap-2 text-white truncate">
                            <FileUp className="w-5 h-5 flex-shrink-0" />
                            <span className="truncate max-w-[200px] sm:max-w-sm">
                              {file.name}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-white hover:text-red-400"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white/70">
                    You can add more files
                  </p>
                </>
              )}

              <button
                onClick={handleButtonClick}
                className="px-6 py-3 bg-white rounded-full text-sky-600 font-semibold transition-all hover:bg-sky-50 flex items-center gap-2"
              >
                {files.length === 0 ? <>Browse Drawings</> : <>Add More Drawings</>}
              </button>

              {files.length > 0 && (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-sky-600 text-white rounded-full font-semibold transition-all hover:bg-sky-700 flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Submit Drawing
                </button>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={acceptedFormats.join(",")}
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <div className="mt-4 text-xs text-white/60 text-center">
            Files should be less than 50MB. For larger files, please contact
            support.
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroInput;
