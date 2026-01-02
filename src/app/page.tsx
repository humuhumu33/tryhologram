"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Math } from "@/components/math";
import { HowItPerforms } from "@/components/how-it-performs";
import {
  Server,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Brain,
  Network,
  Gauge,
  Layers,
  Code2,
  Atom,
  DollarSign,
  Lock,
  Activity,
  Github,
  MessageCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden pb-12 pt-4 sm:pb-20 sm:pt-0 lg:pb-36 lg:pt-0 hero-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 sm:gap-12 lg:gap-16 lg:flex-row lg:justify-between lg:items-start">
            <div className="flex-1 text-center lg:text-left lg:max-w-2xl space-y-6 sm:space-y-8 lg:space-y-12 pt-2 lg:pt-3">
              <div>
                <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl flex flex-col gap-0 leading-tight sm:leading-tight">
                  <span>Run Instant AI</span>
                  <span>Inference</span>
                  <span>on Any Device</span>
                </h1>
              </div>
              <div>
                <p className="hero-subtitle mx-auto max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground lg:mx-0 leading-relaxed px-2 sm:px-0">
                  Accelerate ML, scientific, and computational workloads with <Math inline>O(1)</Math> geometry-powered virtual compute.
                </p>
              </div>
              <div className="hero-cta flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 lg:justify-start px-2 sm:px-0">
                <Button
                  asChild
                  size="lg"
                  className="group relative min-h-[44px] sm:h-12 overflow-hidden border-cyan/40 bg-cyan/15 px-6 text-base sm:text-lg font-semibold text-cyan-foreground hover:border-cyan/60 hover:bg-cyan/20 hover:shadow-lg hover:shadow-cyan/20 active:scale-[0.98] transition-transform"
                >
                  <a href="#what-is-hologram">
                    <span className="relative z-10">
                      Learn More
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group min-h-[44px] sm:h-12 border-2 border-purple-500 bg-black/50 px-6 text-base sm:text-lg font-semibold text-white hover:border-purple-400 hover:bg-black/70 hover:shadow-lg hover:shadow-purple/30 active:scale-[0.98] transition-transform"
                >
                  <Link href="/benchmarks">
                    <span className="relative z-10">See Benchmarks</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <div className="mx-auto mt-6 sm:mt-10 flex flex-row flex-nowrap items-center justify-center gap-0.5 sm:gap-1 lg:gap-2 xl:gap-4 lg:mx-0 lg:justify-start pt-4 sm:pt-2 border-t border-border/10 px-0.5 sm:px-1 overflow-hidden">
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6 flex-shrink-0 text-cyan" />
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-base font-medium text-foreground whitespace-nowrap">Ultra-fast AI inference</span>
                </div>
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6 flex-shrink-0 text-cyan" />
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-base font-medium text-foreground whitespace-nowrap">Low cost & energy-efficient</span>
                </div>
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6 flex-shrink-0 text-cyan" />
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-base font-medium text-foreground whitespace-nowrap">Secure & vendor-free</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block -mt-4">
              <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                <img
                  src="/torus-hero.gif"
                  alt="Holographic Torus Animation"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  style={{
                    mixBlendMode: 'screen',
                    filter: 'contrast(1.1) brightness(1.1)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible With Section */}
      <section className="relative z-10 py-8 sm:py-12 border-b border-border/10 border-t border-border/10">
        {/* Transparent overlay border for contrast */}
        <div className="absolute inset-0 border-x border-border/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/5 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Backend-agnostic */}
            <div>
              <div className="text-center mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Backend-agnostic
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
                <div className="flex flex-col items-center gap-2.5">
                  <Cpu className="h-10 w-10 text-foreground" />
                  <span className="text-sm font-medium text-foreground">CPU</span>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <Zap className="h-10 w-10 text-foreground" />
                  <span className="text-sm font-medium text-foreground">GPU</span>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <Brain className="h-10 w-10 text-foreground" />
                  <span className="text-sm font-medium text-foreground">TPU</span>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <Code2 className="h-10 w-10 text-foreground" />
                  <span className="text-sm font-medium text-foreground">WASM</span>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <Globe className="h-10 w-10 text-foreground" />
                  <span className="text-sm font-medium text-foreground">WebGPU</span>
                </div>
              </div>
            </div>
            
            {/* Compatible with */}
            <div>
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Compatible with
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12">
                <div className="flex flex-col items-center gap-2.5">
                  <Atom className="h-10 w-10 text-foreground" />
                  <span className="text-sm font-medium text-foreground">PyTorch</span>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <Network className="h-10 w-10 text-foreground" />
                  <span className="text-sm font-medium text-foreground">TensorFlow</span>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <Server className="h-10 w-10 text-foreground" />
                  <span className="text-sm font-medium text-foreground">ONNX</span>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <Gauge className="h-10 w-10 text-foreground" />
                  <span className="text-sm font-medium text-foreground">CUDA</span>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <Layers className="h-10 w-10 text-foreground" />
                  <span className="text-sm font-medium text-foreground">ROCm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Hologram Section */}
      <section id="what-is-hologram" className="relative z-10 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              What Is Hologram?
            </h2>
            <p className="text-lg text-cyan mt-6">
              VIRTUAL IN-MEMORY COMPUTE
            </p>
          </div>
          
          <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
            <div className="space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-foreground">
                Hologram is a high performance virtual infrastructure built on a new geometric computing paradigm. It enables instant, energy efficient, and secure general-purpose computation and AI inference across any device, from edge to cloud. Turning any device into a supercomputer through virtual acceleration.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-foreground">
                At its core is a simple but fundamental insight: <strong className="text-cyan font-semibold">information is not arbitrary</strong>.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-foreground">
                Information has an inherent mathematical structure, as fundamental as the laws of physics. Meaningful data forms stable geometric patterns that encode relationships directly, while traditional systems waste energy rediscovering them at runtime by moving data between memory and processors.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-foreground">
                Hologram aligns byte level computation with the natural structure of information, computing directly in memory instead of working against it. By preserving relationships, entire classes of problems collapse in complexity. The result is near constant time O(1) runtime, significantly lower energy use, and scalable AI without specialized hardware or vendor lock in.
              </p>
            </div>

            <div className="pt-8 border-t border-border/20">
              <p className="mb-6 text-xl font-semibold text-foreground">
                At its core, Hologram is both:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="rounded-lg border border-border/20 bg-surface-dark/30 p-4 sm:p-6 hover:border-border/40 hover:bg-surface-dark/40 transition-all duration-200">
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                      1. Theoretical Breakthrough (Atlas)
                    </h3>
                    <p className="mb-3 text-muted-foreground">
                      A universal, lossless geometric computation framework built directly on information's natural mathematical structure. The discovered physics of information.
                    </p>
                    <Link
                      href="/research"
                      className="text-sm font-medium text-cyan hover:text-cyan/80 transition-colors inline-flex items-center gap-1"
                    >
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-lg border border-border/20 bg-surface-dark/30 p-6 hover:border-border/40 hover:bg-surface-dark/40 transition-all duration-200">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      2. Virtual High-Performance Hypervisor
                    </h3>
                    <p className="mb-3 text-muted-foreground">
                      Software-defined implementation that turns expensive runtime computation into a constant-time O(1) in-memory lookup. Hardware backend-agnostic.
                    </p>
                    <Link
                      href="/how"
                      className="text-sm font-medium text-cyan hover:text-cyan/80 active:text-cyan/70 transition-colors inline-flex items-center gap-1 min-h-[44px] px-2 -ml-2 touch-manipulation"
                    >
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Why it matters Section */}
          <div className="mt-8 sm:mt-10 lg:mt-12 pt-12 sm:pt-16 lg:pt-24 border-t border-border/10">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 px-2 sm:px-0">
                Why it matters?
              </h2>
              <p className="text-base sm:text-lg text-cyan mt-4 sm:mt-6">
                DO MORE WITH LESS
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 lg:pt-12 border-t border-border/10">
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {/* Ultra-fast AI inference */}
              <div className="rounded-lg border border-border/20 bg-surface-dark/30 p-4 sm:p-6 hover:border-border/40 hover:bg-surface-dark/40 transition-all duration-200 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg border border-border/30 flex-shrink-0">
                    <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Ultra-fast AI inference
                  </h3>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Deliver a <strong className="text-foreground font-semibold">broadband-like AI experience</strong> with <strong className="text-foreground font-semibold">zero runtime lag</strong>, enabling smooth, responsive, real-time applications.
                </p>
                <div className="pt-3 sm:pt-4 border-t border-border/20">
                  <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-cyan">
                    <li>• <strong>AI research labs</strong></li>
                    <li>• <strong>Edge devices & IoT</strong></li>
                  </ul>
                </div>
              </div>

              {/* Low cost & energy-efficient */}
              <div className="rounded-lg border border-border/20 bg-surface-dark/30 p-4 sm:p-6 hover:border-border/40 hover:bg-surface-dark/40 transition-all duration-200 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg border border-border/30 flex-shrink-0">
                    <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Low cost & energy-efficient
                  </h3>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Run advanced AI on <strong className="text-foreground font-semibold">commodity hardware</strong>, cutting compute and energy costs to <strong className="text-foreground font-semibold">boost profit margins</strong>.
                </p>
                <div className="pt-3 sm:pt-4 border-t border-border/20">
                  <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-cyan">
                    <li>• AI startups</li>
                    <li>• Data centres</li>
                  </ul>
                </div>
              </div>

              {/* Secure & vendor-free */}
              <div className="rounded-lg border border-border/20 bg-surface-dark/30 p-4 sm:p-6 hover:border-border/40 hover:bg-surface-dark/40 transition-all duration-200 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/30">
                    <Lock className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Secure & vendor-free
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Hybrid-cloud AI runtime delivering <strong className="text-foreground font-semibold">secure, virtual private infrastructure</strong> with <strong className="text-foreground font-semibold">full data control</strong>.
                </p>
                <div className="pt-4 border-t border-border/20">
                  <ul className="space-y-2 text-base text-cyan">
                    <li>• Regulated enterprise</li>
                    <li>• Government & Defence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="relative z-10 pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24 lg:pb-32 border-t border-border/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              How it works?
            </h2>
            <p className="text-lg text-cyan mt-6">
              COMPILE ONCE, RUN ANYWHERE
            </p>
          </div>

          <div className="mt-12 space-y-12">
            <div className="space-y-6 text-lg leading-relaxed text-foreground max-w-4xl mx-auto">
              <p>
                Hologram is a compile-first library that acts as a virtual high-performance hypervisor for computation. It is compiled into your application and runs in-process (same PID and memory space), virtualizing execution across CPU, GPU, and WASM backends.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {/* Compile once */}
              <div className="group relative rounded-xl border border-border/20 bg-surface-dark/30 p-8 space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/30 flex-shrink-0">
                    <Code2 className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      1. Compile Once
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    At build time, Hologram analyzes your data, graphs, or models and projects them into a geometric compute space. Computation becomes a fixed canonical circuit instead of a sequence of iterative instructions.
                  </p>
                  <p>
                    Redundant operations are eliminated. Operation chains are fused through algebraic simplification, producing a compact representation.
                  </p>
                  <p>
                    From this, Hologram generates software-defined circuits backed by precomputed mappings over a finite torus structure.
                  </p>
                </div>

                <div className="pt-4 pb-2 border-t border-border/10">
                  <p className="text-base font-semibold text-foreground mb-3">What this means:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan mt-0.5">•</span>
                      <span>Computation is fixed at compile time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan mt-0.5">•</span>
                      <span>Redundant ops removed structurally</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan mt-0.5">•</span>
                      <span>Execution paths determined before runtime</span>
                    </li>
                  </ul>
                </div>

                <p className="text-base leading-relaxed text-muted-foreground pt-2 border-t border-border/10">
                  Hologram circuits compile to a backend agnostic ISA and embed directly into your application binary.
                </p>
              </div>

              {/* Run anywhere */}
              <div className="group relative rounded-xl border border-border/20 bg-surface-dark/30 p-8 space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/30 flex-shrink-0">
                    <Globe className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      2. Run Anywhere
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    At runtime, Hologram doesn't interpret, JIT, or recompile. It runs in-process as a library-level hypervisor, virtualizing execution across hardware backends.
                  </p>
                  <p>
                    The backend layer translates precompiled ISA into native operations based on available hardware:
                  </p>
                </div>

                <div className="space-y-2.5 py-2">
                  <div className="flex items-start gap-3 p-2.5 rounded border border-border/10 bg-surface-dark/20">
                    <Cpu className="h-4 w-4 text-white mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <div className="text-base font-medium text-foreground">CPU</div>
                      <p className="text-base text-muted-foreground">Statically linked, SIMD-optimized with Rayon parallelism</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 rounded border border-border/10 bg-surface-dark/20">
                    <Gauge className="h-4 w-4 text-white mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <div className="text-base font-medium text-foreground">GPU</div>
                      <p className="text-base text-muted-foreground">Precompiled kernels: CUDA, Metal, WebGPU</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 rounded border border-border/10 bg-surface-dark/20">
                    <Layers className="h-4 w-4 text-white mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <div className="text-base font-medium text-foreground">WASM</div>
                      <p className="text-base text-muted-foreground">SIMD128 in linear memory for browsers/Node.js</p>
                    </div>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-muted-foreground pt-2 border-t border-border/10">
                  Backend selection is automatic. Same binary runs across environments.
                </p>
              </div>

              {/* Execute in constant time */}
              <div className="group relative rounded-xl border border-border/20 bg-surface-dark/30 p-8 space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/30 flex-shrink-0">
                    <Zap className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      3. Execute in Constant Time
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    At execution, inputs flow through the circuit in a single pass. Operation chains collapse into fixed-cost primitives:
                  </p>
                </div>

                <div className="space-y-2 py-2">
                  <div className="flex items-center gap-2.5 p-2.5 rounded border border-border/10 bg-surface-dark/20">
                    <span className="text-cyan">•</span>
                    <span className="text-base text-muted-foreground">Constant-time hash table lookups</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded border border-border/10 bg-surface-dark/20">
                    <span className="text-cyan">•</span>
                    <span className="text-base text-muted-foreground">Direct memory access</span>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-muted-foreground pt-2">
                  Mappings fit in L1/L2 cache, so execution follows a tight memory-access pattern that minimizes latency.
                </p>

                <div className="pt-4 pb-2 border-t border-border/10">
                  <p className="text-base font-semibold text-foreground mb-3">Why this matters:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan mt-0.5">•</span>
                      <span>Cost depends on topology, not model size</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan mt-0.5">•</span>
                      <span>Predictable, bounded execution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan mt-0.5">•</span>
                      <span>Stable performance across inputs</span>
                    </li>
                  </ul>
                </div>

                <p className="text-base leading-relaxed text-muted-foreground pt-2 border-t border-border/10">
                  Enables low-latency AI inference (ONNX graphs) on CPUs, GPUs, and edge devices without specialized hardware.
                </p>
              </div>
            </div>

            {/* Deployment model */}
            <div className="mt-12 pt-8 border-t border-border/20">
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Deployment model
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/10 border border-cyan/20 mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-cyan" />
                  </div>
                  <p className="text-base text-muted-foreground">
                    Open-source library
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/10 border border-cyan/20 mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-cyan" />
                  </div>
                  <p className="text-base text-muted-foreground">
                    Runs inside your application process
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/10 border border-cyan/20 mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-cyan" />
                  </div>
                  <p className="text-base text-muted-foreground">
                    No external runtime or services
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/10 border border-cyan/20 mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-cyan" />
                  </div>
                  <p className="text-base text-muted-foreground">
                    No special hardware required
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/10 border border-cyan/20 mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-cyan" />
                  </div>
                  <p className="text-base text-muted-foreground">
                    GPU acceleration is optional
                  </p>
                </div>
                <div className="flex items-start gap-3 md:col-span-2 lg:col-span-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/10 border border-cyan/20 mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-cyan" />
                  </div>
                  <p className="text-base text-muted-foreground">
                    Works in Rust, Python (FFI), Web, mobile, and server environments
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <Button
                  asChild
                  size="lg"
                  className="group relative h-12 overflow-hidden border-cyan/40 bg-cyan/15 px-6 text-lg font-semibold text-cyan-foreground hover:border-cyan/60 hover:bg-cyan/20 hover:shadow-lg hover:shadow-cyan/20"
                >
                  <Link href="/how">
                    <span className="relative z-10">
                      Learn more
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  disabled
                  className="h-12 border-2 border-border/20 bg-surface-dark/30 px-6 text-lg font-semibold text-muted-foreground cursor-not-allowed opacity-60"
                >
                  Read docs <span className="text-sm">(coming soon)</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it performs Section */}
      <HowItPerforms />

      {/* Start Building Banner */}
      <section className="relative z-10 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 lg:pb-32 border-t border-border/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/20 bg-surface-dark/40 p-12 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.3) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Ready to build at the speed of math?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Accelerate ML, scientific, and computational workloads with <Math inline>O(1)</Math> geometry-powered virtual compute.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-6 bg-white text-black hover:bg-gray-100 border border-black/10 font-semibold"
                >
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub - Get Started
                  </Link>
                </Button>
                
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 border-2 border-border/40 bg-surface-dark/50 hover:bg-surface-dark/70 font-semibold"
                >
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Read Docs (coming soon)
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
