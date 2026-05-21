using FluentValidation;
using Outeiport.Api.Infrastructure.Email;
using Outeiport.Api.Infrastructure.Scrapers;
using Outeiport.Api.Infrastructure.ISV;
using Outeiport.Api.Features.Simulate;
using Outeiport.Api.Features.Proposal;
using Resend;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    options.AddPolicy("Frontend", policy =>
        policy
            .WithOrigins(
                builder.Configuration["AllowedOrigins"]?.Split(',')
                ?? ["http://localhost:5173"])
            .AllowAnyHeader()
            .AllowAnyMethod()));

builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);

builder.Services.AddSingleton<IMobileDeScraperService, MobileDeScraperService>();
builder.Services.AddSingleton<ISVCalculator>();

builder.Services.AddOptions();
builder.Services.Configure<ResendClientOptions>(o =>
    o.ApiToken = builder.Configuration["RESEND_API_KEY"] ?? "");
builder.Services.AddHttpClient<IResend, ResendClient>();
builder.Services.AddTransient<IEmailService, ResendEmailService>();

builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseExceptionHandler();
app.UseCors("Frontend");

app.MapSimulateEndpoints();
app.MapProposalEndpoints();

app.Run();
