<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->foreignId('opportunity_id')->nullable()->change();
            $table->foreignId('funding_program_id')->nullable()->after('opportunity_id');
            $table->foreign('funding_program_id')->references('id')->on('funding_programs')->nullOnDelete();
        });

        Schema::table('verification_requests', function (Blueprint $table) {
            $table->foreignId('government_entity_id')->nullable()->after('organization_id');
            $table->foreign('government_entity_id')->references('id')->on('government_entities')->nullOnDelete();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('athlete')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropForeign(['funding_program_id']);
            $table->dropColumn('funding_program_id');
        });

        Schema::table('verification_requests', function (Blueprint $table) {
            $table->dropForeign(['government_entity_id']);
            $table->dropColumn('government_entity_id');
        });
    }
};
